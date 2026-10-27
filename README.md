<p align="center"><img src="resources/peach-logo-128.png" alt="Peach" width="88"></p>

# Peach

A local-first video metadata scraper and media manager.

[Website](https://peach.video) · [Download](https://peach.video/#download) · [Live demo](https://demo.peach.video) · [Documentation](#documentation) · [简体中文](README.zh-CN.md)

[![Release](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdownloads.peach.video%2Freleases.json&query=%24%5B0%5D.tag_name&label=release)](https://gitgud.io/peach-mitao/peach/-/releases)
[![CI pipelines](https://img.shields.io/badge/CI-GitGud-554488?logo=gitlab&logoColor=white)](https://gitgud.io/peach-mitao/peach/-/pipelines?ref=master)
[![License](https://img.shields.io/badge/license-AGPL--3.0--or--later-blue?logo=gnu&logoColor=white)](LICENSE)
[![Windows x64](https://img.shields.io/badge/Windows-x64-0078D4)](docs/TESTING_DESKTOP.md)
[![macOS DMG](https://img.shields.io/badge/macOS-DMG-555555?logo=apple&logoColor=white)](docs/OPERATIONS.md#macos-独立测试包)
[![Age restrictions](https://img.shields.io/badge/age-18%2B-555555)](#license)

## Screenshots

[![Video library with search, filters and posters](https://peach.video/assets/screenshots/home-wide-20261025-2-1280.webp)](https://peach.video/assets/screenshots/home-wide-20261025-2.png)

Movie demo data; see [asset credits and licenses](https://peach.video/en/credits/).

<details>
<summary>More screenshots</summary>

**People and works**

[![Charlie Chaplin's profile and films](https://peach.video/assets/screenshots/profile-wide-20261025-2-1280.webp)](https://peach.video/assets/screenshots/profile-wide-20261025-2.png)

**Creator updates**

[![Creator follows and new works](https://peach.video/assets/screenshots/follow-wide-20261025-2-1280.webp)](https://peach.video/assets/screenshots/follow-wide-20261025-2.png)

**Library statistics**

[![Library, storage and viewing statistics](https://peach.video/assets/screenshots/stats-wide-20261025-3-1280.webp)](https://peach.video/assets/screenshots/stats-wide-20261025-3.png)

**Player**

[![Big Buck Bunny player](https://peach.video/assets/screenshots/play-wide-20261025-2-1280.webp)](https://peach.video/assets/screenshots/play-wide-20261025-2.png)

</details>

## Features

- **Metadata scraping**: recognize video codes, read NFO files and fill titles, performers, studios and covers from multiple sources while keeping your edits.
- **Local and cloud libraries**: browse local drives, SMB, mounted cloud storage and PikPak libraries together.
- **Playback and history**: web and external players, subtitles, playback speed, rotation, resume and timeline previews.
- **Follows and discovery**: track performer and creator updates, discover titles and manage a want list.
- **Cloud download**: search by video code or submit a magnet link, then organize completed downloads into your library.
- **Library management**: manage tags, duplicates, versions and parts; metadata and watch history are stored locally.

## Download and use

| Method | Get started |
| --- | --- |
| Windows | [Installer and portable builds](https://peach.video/#download) |
| macOS | [Apple Silicon / Intel DMG](https://peach.video/#download) |
| Docker / NAS | [Deployment guide](docs/DOCKER.md) |
| Source | [Setup instructions](docs/OPERATIONS.md#从源码运行windowsmacos); requires Git, uv and Python 3.14+ |

Choose your media folders after installation, then scan to start browsing and playing. Desktop test builds are unsigned, and macOS builds are not notarized. See the [Windows](docs/TESTING_DESKTOP.md) and [macOS](docs/OPERATIONS.md#macos-独立测试包) guides.

## Documentation

[Operations](docs/OPERATIONS.md) · [Sources](docs/SOURCING.md) · [External players](docs/EXTERNAL_PLAYERS.md) · [Diagnostics and data sharing](docs/DIAGNOSTICS.md) · [Changelog](CHANGELOG.md)

Development: [Contributing](CONTRIBUTING.md) · [Development guide](AGENTS.md) · [Testing](docs/TESTING.md)

## Reporting problems

[Report a bug or suggest a feature](https://github.com/peach-mitao/peach/issues/new/choose) with your version, steps and error message. Use demo data in public screenshots and redact private information; do not upload videos or databases. Report vulnerabilities privately through the [security policy](SECURITY.md).

## Related projects

Thanks to [amane](https://github.com/sqzw-x/amane), [Gfriends](https://github.com/gfriends/gfriends) and [CloudDrive2](https://www.clouddrive2.com/). See the [reuse inventory](docs/REUSE.md) for full credits.

## Star History

<a href="https://www.star-history.com/?repos=peach-mitao%2Fpeach&amp;type=date&amp;releases=&amp;legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=peach-mitao/peach&amp;type=date&amp;theme=dark&amp;releases=&amp;legend=top-left">
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=peach-mitao/peach&amp;type=date&amp;releases=&amp;legend=top-left">
    <img alt="Peach cumulative stars, linear scale" src="https://api.star-history.com/svg?repos=peach-mitao/peach&amp;type=date&amp;releases=&amp;legend=top-left">
  </picture>
</a>

## License

[AGPL-3.0-or-later](LICENSE) · Copyright (C) 2026 longmeidao. Third-party components retain their own licenses.

Manage only media you own or are authorized to use, subject to laws, copyright and source-platform access, age and regional restrictions. Peach does not provide video resources or access to paid content.
