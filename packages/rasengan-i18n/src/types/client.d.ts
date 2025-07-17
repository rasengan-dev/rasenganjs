declare module 'virtual:rasengan:i18n' {
  import { I18nConfig, Resources } from './index.js';

  const i18n: {
    resources: Resources;
    config: I18nConfig;
  };
  export default i18n;
}
