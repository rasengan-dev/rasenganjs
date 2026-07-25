import { NavigationGroup, NavigationItem, NavigationType } from './types';
import { documentationNavigation } from './sections/documentation';
import { futonNavigation } from './sections/futon';
import { serverNavigation } from './sections/server';
import { packagesNavigation } from './sections/packages';
import { navbarNavigation } from './sections/navbar';

export { NavigationGroup };
export type { NavigationItem, NavigationType };

export const NavigationData: Record<NavigationType, Array<NavigationItem>> = {
  [NavigationGroup.DOCUMENTATION]: documentationNavigation,
  [NavigationGroup.FUTON]: futonNavigation,
  [NavigationGroup.SERVER]: serverNavigation,
  [NavigationGroup.PACKAGES]: packagesNavigation,
  [NavigationGroup.NAVBAR]: navbarNavigation,
};
