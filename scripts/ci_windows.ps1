param([ValidateSet('verify', 'build', 'smoke')][string]$Mode = 'verify')
$ErrorActionPreference = 'Stop'

function Assert-Exit([string]$Message) {
    if ($LASTEXITCODE -ne 0) { throw $Message }
}

if ($Mode -eq 'verify' -or $Mode -eq 'build') {
    uv sync --locked --all-extras --python 3.14
    Assert-Exit '锁定依赖安装失败'
    uv pip check --python .venv/Scripts/python.exe
    Assert-Exit '依赖检查失败'
    & .venv/Scripts/python.exe -X utf8 scripts/npm_ci.py --ignore-scripts
    Assert-Exit '根目录 npm 安装失败'
    & .venv/Scripts/python.exe -X utf8 scripts/npm_ci.py --prefix frontend
    Assert-Exit '前端依赖安装失败'
}

if ($Mode -eq 'verify') {
    $env:PEACH_E2E_CHROME = Join-Path $env:ProgramFiles 'Google/Chrome/Application/chrome.exe'
    & ./scripts/test.ps1 -Scope full -Fresh
    Assert-Exit 'Windows 全量回归未通过'
    exit 0
}

if ($Mode -eq 'build') {
    $LocalCompiler = Join-Path $env:LOCALAPPDATA 'Programs/Inno Setup 6/ISCC.exe'
    if (-not $env:PEACH_ISCC -and (Test-Path -LiteralPath $LocalCompiler)) { $env:PEACH_ISCC = $LocalCompiler }
    $Version = (& .venv/Scripts/python.exe -c 'from peach import __version__; print(__version__)').Trim()
    Assert-Exit '无法读取发布版本'
    if ($env:CI_COMMIT_TAG -ne "v$Version") { throw 'Tag 与版本不一致' }
    $Changes = git status --porcelain --untracked-files=all
    Assert-Exit '无法核对提交状态'
    if ($Changes) { throw '构建必须使用干净提交' }
    & ./scripts/fetch_cloudflared.ps1 -OutputPath build/cloudflared.exe
    Assert-Exit 'cloudflared 校验失败'
    & ./scripts/test.ps1 -Scope packaging -Focus test_desktop_installer
    Assert-Exit '安装目录保护回归失败'
    & ./scripts/build_windows.ps1 -Installer -CloudflaredPath build/cloudflared.exe -FFmpegPath build/ffmpeg-windows/ffmpeg -UntruncPath build/untrunc-windows/untrunc
    Assert-Exit 'Windows 构建失败'
    New-Item -ItemType Directory -Path release -Force | Out-Null
    & .venv/Scripts/python.exe scripts/package_windows_release.py --source dist/Peach --output release --version $Version --lite-installer
    Assert-Exit '发行包拆分失败'
    Copy-Item -LiteralPath "dist/Peach-$Version-windows-x64-setup.exe" -Destination release/
    Copy-Item -LiteralPath dist/ffmpeg-corresponding-source.zip, dist/untrunc-corresponding-source.zip -Destination release/
    Copy-Item -LiteralPath scripts/smoke_desktop.py, scripts/smoke_update_tasks.py, scripts/smoke_split_update.py, scripts/ci_windows.ps1 -Destination release/
    & .venv/Scripts/python.exe scripts/changelog.py --notes $Version --to release/RELEASE_NOTES.md
    Assert-Exit '缺少发布说明'
    Add-Content -LiteralPath release/RELEASE_NOTES.md -Value (Get-Content -LiteralPath release/DOWNLOADS.md -Raw -Encoding utf8) -Encoding utf8
    $Version | Set-Content -LiteralPath release/version.txt -Encoding utf8
    exit 0
}

$Version = (Get-Content -LiteralPath release/version.txt -Raw -Encoding utf8).Trim()
$Packages = (Resolve-Path release).Path
$Evidence = Join-Path ([IO.Path]::GetTempPath()) ('peach-release-smoke-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $Evidence | Out-Null
$Python = (Get-Command python.exe).Source
$Key = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\{02D9748A-78F6-4866-AC75-918177194DAB}_is1'
$Menu = Join-Path $env:APPDATA 'Microsoft/Windows/Start Menu/Programs/Peach.lnk'
if ((Test-Path -LiteralPath $Key) -or (Test-Path -LiteralPath $Menu)) { throw '现有 Peach 安装登记需要保留，不能覆盖安装验收' }
Push-Location $Evidence
try {
    Expand-Archive -LiteralPath "$Packages/Peach-$Version-windows-x64.zip" -DestinationPath candidate
    & $Python "$Packages/smoke_desktop.py" candidate/Peach/Peach.exe
    Assert-Exit '完整包运行验收失败'
    & $Python "$Packages/smoke_split_update.py" --root $Packages --version $Version --destination split-candidate --prepare-with-app
    Assert-Exit '拆分包重建失败'
    & $Python "$Packages/smoke_desktop.py" split-candidate/Peach/Peach.exe
    Assert-Exit '拆分包运行验收失败'
    foreach ($Suffix in @('-setup.exe', '-lite-setup.exe')) {
        $Installed = Join-Path $Evidence ('安装验收/自定义目录' + $Suffix)
        $Setup = Start-Process -FilePath "$Packages/Peach-$Version-windows-x64$Suffix" -ArgumentList @('/VERYSILENT', '/SUPPRESSMSGBOXES', '/NORESTART', "/DIR=`"$Installed`"") -WindowStyle Hidden -Wait -PassThru
        if ($Setup.ExitCode -ne 0) { throw "安装包退出码 $($Setup.ExitCode)" }
        if (-not (Test-Path -LiteralPath $Key) -or -not (Test-Path -LiteralPath $Menu)) { throw '缺少安装登记或开始菜单项' }
        & $Python "$Packages/smoke_desktop.py" (Join-Path $Installed 'Peach.exe')
        Assert-Exit '安装包运行验收失败'
        Start-Process -FilePath (Join-Path $Installed 'unins000.exe') -ArgumentList @('/VERYSILENT', '/SUPPRESSMSGBOXES', '/NORESTART') -WindowStyle Hidden -Wait
        $Deadline = (Get-Date).AddSeconds(120)
        while ((Test-Path -LiteralPath $Installed) -and (Get-Date) -lt $Deadline) { Start-Sleep -Seconds 1 }
        if ((Test-Path -LiteralPath $Installed) -or (Test-Path -LiteralPath $Key) -or (Test-Path -LiteralPath $Menu)) { throw '卸载验收未通过' }
    }
    & $Python "$Packages/smoke_update_tasks.py" candidate/Peach/Peach.exe --installer "$Packages/Peach-$Version-windows-x64-setup.exe" --apply
    Assert-Exit '任务保护与安装恢复验收失败'
} finally {
    Pop-Location
    Write-Host "独立制品验收目录：$Evidence"
}
