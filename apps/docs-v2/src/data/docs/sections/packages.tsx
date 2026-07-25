import { Package } from 'lucide-react';
import { randomId } from '@/utils';
import { NavigationItem } from '../types';

export const packagesNavigation: NavigationItem[] = [
  {
    id: randomId(),
    name: 'Packages',
    icon: <Package size={20} />,
    level: 1,
    children: [
      {
        id: randomId(),
        name: 'Image',
        link: '/packages/image',
        level: 2,
      },
      {
        id: randomId(),
        name: 'MDX',
        link: '/packages/mdx',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Theme',
        link: '/packages/theme',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Kurama',
        link: '/packages/kurama',
        level: 2,
        // visible: false,
        isNew: true,
      },
      {
        id: randomId(),
        name: 'Query',
        link: '#',
        level: 2,
        // visible: false,
        isComingSoon: true,
      },
      {
        id: randomId(),
        name: 'Kage Demo',
        link: '/packages/kage-demo',
        level: 2,
        // visible: false,
        isNew: true,
      },
      {
        id: randomId(),
        name: 'Sitemap',
        link: '#',
        level: 2,
        // visible: false,
        isComingSoon: true,
      },
      {
        id: randomId(),
        name: 'I18n',
        link: '/packages/i18n',
        level: 2,
      },
      {
        id: randomId(),
        name: 'IO',
        link: '/packages/io',
        level: 2,
        isNew: true,
      },
      {
        id: randomId(),
        name: 'Create Rasengan CLI',
        link: '/packages/create-rasengan',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Adapters',
        level: 2,
        children: [
          {
            id: randomId(),
            name: 'Vercel',
            link: '/packages/vercel',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Node',
            link: '/packages/serve',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Netlify',
            link: '#',
            level: 3,
            isComingSoon: true,
          },
        ],
      },
    ],
  },
];
