import type { ReactNode } from 'react';

export const NavigationGroup = {
  DOCUMENTATION: 'documentation',
  FUTON: 'futon',
  SERVER: 'server',
  PACKAGES: 'packages',
  NAVBAR: 'navbar',
} as const;

export type NavigationType =
  (typeof NavigationGroup)[keyof typeof NavigationGroup];

export type NavigationItem = {
  id: number;
  name: string;
  link?: string;
  level: 1 | 2 | 3;
  icon?: ReactNode;
  visible?: boolean;
  children?: Array<NavigationItem>;
  isNew?: boolean;
  isComingSoon?: boolean;
  isBeta?: boolean;
  external?: boolean;
};
