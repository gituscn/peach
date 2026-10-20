import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { PluginOption } from 'vite';

export const browserArtifacts = fileURLToPath(new URL('../../build/sentry/browser', import.meta.url));
const publicDist = fileURLToPath(new URL('../../web/dist', import.meta.url));
const debugIdPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

/** 正式 JavaScript 与 map 共用官方注入的 Debug ID；公开目录只接收 JS 和 CSS。 */
export function browserSymbols(bundleName: 'peach-app' | 'peach-pages', destination = process.env.PEACH_FRONTEND_OUT_DIR || publicDist): PluginOption[] {
  return [
    sentryVitePlugin({
      authToken: '', org: '', project: '', silent: true,
      telemetry: false,
      release: { name: '', inject: false, create: false, finalize: false, setCommits: false, deploy: false },
      sourcemaps: { disable: 'disable-upload' },
    }),
    {
      name: 'peach-publish-browser-assets',
      enforce: 'post',
      writeBundle: {
        sequential: true,
        handler(options) {
          const directory = resolve(options.dir || browserArtifacts);
          const javascript = readFileSync(resolve(directory, `${bundleName}.js`), 'utf8');
          const map = JSON.parse(readFileSync(resolve(directory, `${bundleName}.js.map`), 'utf8'));
          const debugId = javascript.match(/\/\/# debugId=([a-f0-9-]+)\s*$/i)?.[1];
          if (!debugId || !debugIdPattern.test(debugId) || map.debug_id !== debugId || !map.sourcesContent?.length) {
            throw new Error(`${bundleName} 的 JavaScript、source map 和 Debug ID 必须匹配`);
          }
          const target = resolve(destination);
          if (target === directory) throw new Error('公开产物目录必须与私有 source map 目录分开');
          mkdirSync(target, { recursive: true });
          for (const extension of ['js', 'css']) {
            const name = `${bundleName}.${extension}`;
            copyFileSync(resolve(directory, name), resolve(target, name));
          }
        },
      },
    },
  ];
}
