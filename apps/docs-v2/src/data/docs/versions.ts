import { NavigationGroup, NavigationType } from './types';

/**
 * Current published version of the package each doc section documents.
 * Bump these alongside the corresponding package.json on release.
 */
export const SectionVersions: Partial<Record<NavigationType, string>> = {
  [NavigationGroup.DOCUMENTATION]: '2.0.0', // rasengan
  [NavigationGroup.FUTON]: '1.0.0', // @rasenganjs/futon
  [NavigationGroup.SERVER]: '1.0.0', // @rasenganjs/server
};
