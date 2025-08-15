import { type Plugin } from 'vite';
import { I18nConfig } from '../types/index.js';
import { generateDefaultConfig } from '../utils/index.js';

export default function i18nPlugin(config: I18nConfig): Plugin {
  const virtualModuleId = 'virtual:rasengan/i18n';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-rasengan-i18n',
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const defaultConfig = generateDefaultConfig(config);

        const stringifyConfig = JSON.stringify(defaultConfig);

        return `
          const modules = import.meta.glob(
            [
              '${defaultConfig.resources.source}/*.json',
            ],
            { eager: true }
          );
          const config = ${stringifyConfig};

          const resources = {};
          const locales = [];

          for (const [filePath, mod] of Object.entries(modules)) {
            const lang = filePath.split('/').pop()?.split('.')[0];

            if (!lang) {
              continue;
            }

            resources[lang] = mod.default;
            locales.push(lang);
          }

          const i18n = {
            resources,
            config,
            locales,
          };

          export default i18n;
        `;
      }
    },
  };
}
