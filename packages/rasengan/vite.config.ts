import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'node:path';
import {
  loadModuleSSR,
  getDirname,
} from './lib/esm/core/config/utils/load-modules.js';
import { plugins } from './lib/esm/core/plugins/index.js';
import { createDefaultViteConfig } from './lib/esm/core/config/vite/defaults.js';

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const rootPath = process.cwd();
  const __dirname = await getDirname(import.meta.url);

  // Load Rasengan config
  const configPath = join(`${rootPath}/rasengan.config.js`);
  const configHandler = await (await loadModuleSSR(configPath)).default;

  const config = await configHandler();

  // Get base config
  const baseConfig = createDefaultViteConfig(rootPath, __dirname, mode, config);

  // Check if rc is configured
  const rcMode = config.sageMode.reactCompiler;
  const rcBabelConfig =
    typeof rcMode === 'object'
      ? {
          plugins: [
            [
              'babel-plugin-react-compiler',
              {
                compilationMode: 'annotation',
              },
            ],
          ],
        }
      : {
          plugins: ['babel-plugin-react-compiler'],
        };

  // Merge with user plugins
  return {
    ...baseConfig,
    plugins: [
      rcMode
        ? react({
            babel: rcBabelConfig,
          })
        : react(),
      ...plugins,
      ...(config.vite?.plugins || []),
    ],
  };
});
