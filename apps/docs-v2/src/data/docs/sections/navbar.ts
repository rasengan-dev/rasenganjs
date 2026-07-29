import { randomId } from '@/utils';
import { NavigationItem } from '../types';

export const navbarNavigation: NavigationItem[] = [
  {
    id: randomId(),
    name: 'Docs',
    level: 1,
    link: '/docs/getting-started/introduction',
  },
  {
    id: randomId(),
    name: 'Skills',
    level: 1,
    link: '/skills',
  },
  {
    id: randomId(),
    name: 'Blog',
    level: 1,
    link: '/blog',
  },
  {
    id: randomId(),
    name: 'Showcase',
    level: 1,
    link: '/showcase',
  },
];
