import { Blocks, Handshake, Unplug } from 'lucide-react';
import React from 'react';

export const NavigationGroup = {
  DOCUMENTATION: 'documentation',
  PACKAGES: 'packages',
} as const;

export type NavigationType =
  (typeof NavigationGroup)[keyof typeof NavigationGroup];
export type NavigationItem = {
  id: number;
  name: string;
  link?: string;
  level: 1 | 2 | 3;
  icon?: React.ReactNode;
  visible?: boolean;
  children?: Array<NavigationItem>;
};

export const NavigationData: Record<NavigationType, Array<NavigationItem>> = {
  [NavigationGroup.DOCUMENTATION]: [
    {
      id: 1,
      name: 'GETTING STARTED',
      icon: <Handshake size={20} />,
      level: 1,
      children: [
        {
          id: 1,
          name: 'Introduction',
          link: '/docs/introduction',
          level: 2,
        },
        {
          id: 2,
          name: 'Installation',
          link: '/docs/installation',
          level: 2,
        },
        {
          id: 3,
          name: 'Project Structure',
          link: '/docs/project-structure',
          level: 2,
        },
      ],
    },
    {
      id: 2,
      name: 'CORE CONCEPTS',
      icon: <Blocks size={20} />,
      level: 1,
      children: [
        {
          id: 1,
          name: 'Routing',
          level: 2,
          children: [
            {
              id: 1,
              name: 'Base Concepts',
              link: '/docs/routing/base-concepts',
              level: 3,
            },
            {
              id: 2,
              name: 'Routes',
              link: '/docs/routing/routes',
              level: 3,
            },
            {
              id: 3,
              name: 'Layouts',
              link: '/docs/routing/layouts',
              level: 3,
            },
            {
              id: 4,
              name: 'Linking & Navigation',
              link: '/docs/routing/linking-and-navigation',
              level: 3,
            },
            {
              id: 5,
              name: 'Dynamic Routes',
              link: '/docs/routing/dynamic-routes',
              level: 3,
            },
            {
              id: 6,
              name: 'Error Handling',
              link: '/docs/routing/error-handling',
              level: 3,
            },
            {
              id: 7,
              name: 'Redirecting',
              link: '/docs/routing/redirecting',
              level: 3,
            },
          ],
        },
        {
          id: 2,
          name: 'Rendering',
          level: 2,
          children: [
            {
              id: 1,
              name: 'Server Side Rendering',
              link: '/docs/rendering/ssr',
              level: 3,
            },
            {
              id: 2,
              name: 'Client Side Rendering',
              link: '/docs/rendering/csr',
              level: 3,
            },
            {
              id: 3,
              name: 'Hydration',
              link: '/docs/deploying/hydration',
              level: 3,
            },
            {
              id: 4,
              name: 'Prerendering',
              link: '/docs/deploying/prerendering',
              level: 3,
              visible: false,
            },
          ],
        },
        {
          id: 3,
          name: 'Styling',
          level: 2,
          children: [
            {
              id: 1,
              name: 'CSS Modules',
              link: '/docs/styling/css-modules',
              level: 3,
            },
            {
              id: 2,
              name: 'Tailwind CSS',
              link: '/docs/styling/tailwindcss',
              level: 3,
            },
            {
              id: 3,
              name: 'CSS Processeurs',
              link: '/docs/styling/preprocesseurs',
              level: 3,
            },
          ],
        },
        {
          id: 3,
          name: 'Optimizing',
          level: 2,
          children: [
            {
              id: 1,
              name: 'Images',
              link: '/docs/optimizing/images',
              level: 3,
            },
            {
              id: 2,
              name: 'Metadata',
              link: '/docs/optimizing/metadata',
              level: 3,
            },
            {
              id: 3,
              name: 'Static Assets',
              link: '/docs/optimizing/static-assets',
              level: 3,
            },
          ],
        },
        {
          id: 3,
          name: 'Configuring',
          level: 2,
          children: [
            {
              id: 1,
              name: 'TypeScript',
              link: '/docs/configuring/typescript',
              level: 3,
            },
            {
              id: 2,
              name: 'Environment Variables',
              link: '/docs/configuring/environment-variables',
              level: 3,
            },
            {
              id: 3,
              name: 'Modules Aliases',
              link: '/docs/configuring/modules-aliases',
              level: 3,
            },
          ],
        },
        {
          id: 3,
          name: 'Deploying',
          level: 2,
          children: [
            {
              id: 1,
              name: 'Vercel',
              link: '/docs/deploying/vercel',
              level: 3,
            },
            {
              id: 2,
              name: 'Node Server',
              link: '/docs/deploying/node',
              level: 3,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'API REFERENCE',
      icon: <Unplug size={20} />,
      level: 1,
      children: [
        {
          id: 1,
          name: 'Components',
          level: 2,
          children: [],
        },
        {
          id: 2,
          name: 'Functions',
          level: 2,
          children: [],
        },
        {
          id: 3,
          name: 'File Conventions',
          level: 2,
          children: [],
        },
        {
          id: 3,
          name: 'rasengan.config.js',
          level: 2,
          children: [],
        },
        {
          id: 3,
          name: 'create-rasengan CLI',
          level: 2,
          children: [],
        },
        {
          id: 3,
          name: 'Rasengan CLI',
          level: 2,
          children: [],
        },
      ],
    },
  ],

  [NavigationGroup.PACKAGES]: [],
};
