import { NavigationGroup, NavigationType } from './types';

/**
 * Current published version of the package each doc section documents.
 * Bump these alongside the corresponding package.json on release.
 */
export const SectionVersions: Partial<Record<NavigationType, string>> = {
  [NavigationGroup.DOCUMENTATION]: '1.2.4', // rasengan
  [NavigationGroup.FUTON]: '1.0.0-beta.1', // @rasenganjs/futon
  [NavigationGroup.SERVER]: '1.0.0-beta.3', // @rasenganjs/server
};
