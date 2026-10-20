// @vitest-environment node
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { SentryCli } from '@sentry/cli';
import { build } from 'vite';
import { afterEach, expect, it } from 'vitest';
import { browserSymbols } from '../scripts/sentry-build';
import { prepareBrowserUpload } from '../scripts/upload-sourcemaps';

const fixtures: string[] = [];
afterEach(() => {
  for (const fixture of fixtures.splice(0)) {
    if (!fixture.startsWith(realpathSync(tmpdir()))) throw new Error('临时目录必须属于系统临时目录');
    rmSync(fixture, { recursive: true, force: true });
  }
});

it('官方构建生成可复现 Debug ID，私有 map 可还原源码位置，公开目录仅含四个正式文件', async () => {
  const root = realpathSync(mkdtempSync(resolve(tmpdir(), 'peach-symbols-')));
  fixtures.push(root);
  const directory = resolve(root, 'artifacts');
  const shipped = resolve(root, 'public');
  writeFileSync(resolve(root, 'fixture.ts'), 'import "./fixture.css";\nexport function fail() { throw new TypeError("symbolication fixture"); }\n');
  writeFileSync(resolve(root, 'fixture.css'), '.fixture { color: red; }\n');
  const compile = async (name: 'peach-app' | 'peach-pages') => {
    await build({
      configFile: false, root, logLevel: 'silent',
      plugins: browserSymbols(name, shipped),
      build: {
        outDir: directory, emptyOutDir: false, sourcemap: 'hidden', minify: 'oxc',
        lib: { entry: resolve(root, 'fixture.ts'), formats: ['es'], fileName: () => `${name}.js`, cssFileName: name },
        rollupOptions: { output: { assetFileNames: `${name}.[ext]` } },
      },
    });
  };
  await compile('peach-app');
  const first = readFileSync(resolve(shipped, 'peach-app.js'), 'utf8');
  await compile('peach-app');
  expect(readFileSync(resolve(shipped, 'peach-app.js'), 'utf8')).toBe(first);
  await compile('peach-pages');
  expect(readdirSync(shipped).sort()).toEqual(['peach-app.css', 'peach-app.js', 'peach-pages.css', 'peach-pages.js']);
  expect(first).not.toContain('sourceMappingURL');
  const mapPath = resolve(directory, 'peach-app.js.map');
  const map = JSON.parse(readFileSync(mapPath, 'utf8'));
  expect(map.sourceRoot).toBeUndefined();
  expect(map.sources.every((source: string) => !/^(?:[a-z]:|\/)/i.test(source))).toBe(true);
  expect(map.debug_id).toMatch(/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/);
  expect(first).toContain(`//# debugId=${map.debug_id}`);
  const token = first.indexOf('TypeError("symbolication fixture")');
  expect(token).toBeGreaterThan(0);
  const before = first.slice(0, token).split('\n');
  const output = execFileSync(SentryCli.getPath(), [
    'sourcemaps', 'resolve', mapPath, '--line', String(before.length), '--column', String(before.at(-1)!.length),
  ], { encoding: 'utf8' });
  expect(output).toContain('fixture.ts');
  expect(output).toContain('symbolication fixture');
  const env = { SENTRY_AUTH_TOKEN: 'test-only', SENTRY_ORG: 'fixture', SENTRY_PROJECT: 'fixture' };
  expect(prepareBrowserUpload(env, directory, shipped)).toEqual([
    'sourcemaps', 'upload', '--validate', '--strict', '--wait', '--url-prefix', 'app:///', directory,
  ]);
  writeFileSync(resolve(shipped, 'peach-app.js'), 'mismatched bundle');
  expect(() => prepareBrowserUpload(env, directory, shipped)).toThrow('分发产物不一致');
  writeFileSync(resolve(shipped, 'peach-app.js'), first);
  writeFileSync(mapPath, JSON.stringify({ ...map, debug_id: 'invalid' }));
  expect(() => prepareBrowserUpload(env, directory, shipped)).toThrow('匹配的 source map');
}, 30_000);

it('上传入口在没有明确环境配置时拒绝启动 CLI', () => {
  expect(() => prepareBrowserUpload({})).toThrow('SENTRY_AUTH_TOKEN');
  expect(() => prepareBrowserUpload({ SENTRY_AUTH_TOKEN: 'test-only' })).toThrow('SENTRY_ORG');
  expect(() => prepareBrowserUpload({ SENTRY_AUTH_TOKEN: 'test-only', SENTRY_ORG: 'fixture' })).toThrow('SENTRY_PROJECT');
});
