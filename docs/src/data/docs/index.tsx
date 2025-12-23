import { Blocks, Handshake, Unplug, Package } from 'lucide-react';
import React from 'react';
import { randomId } from '@/utils';

export const NavigationGroup = {
  DOCUMENTATION: 'documentation',
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
  icon?: React.ReactNode;
  visible?: boolean;
  children?: Array<NavigationItem>;
  isNew?: boolean;
  isComingSoon?: boolean;
  isBeta?: boolean;
};

export const NavigationData: Record<NavigationType, Array<NavigationItem>> = {
  [NavigationGroup.DOCUMENTATION]: [
    {
      id: randomId(),
      name: 'GETTING STARTED',
      icon: <Handshake size={20} />,
      level: 1,
      children: [
        {
          id: randomId(),
          name: 'Introduction',
          link: '/docs/getting-started/introduction',
          level: 2,
        },
        {
          id: randomId(),
          name: 'Installation',
          link: '/docs/getting-started/installation',
          level: 2,
        },
        {
          id: randomId(),
          name: 'Project Structure',
          link: '/docs/getting-started/project-structure',
          level: 2,
        },
      ],
    },
    {
      id: randomId(),
      name: 'CORE CONCEPTS',
      icon: <Blocks size={20} />,
      level: 1,
      children: [
        {
          id: randomId(),
          name: 'Routing',
          level: 2,
          children: [
            {
              id: randomId(),
              name: 'Base Concepts',
              link: '/docs/routing/base-concepts',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Router',
              link: '/docs/routing/router-configuration',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Routes',
              link: '/docs/routing/routes',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Layouts',
              link: '/docs/routing/layouts',
              level: 3,
            },
            {
              id: randomId(),
              name: 'File-Based Routing',
              link: '/docs/routing/file-based-routing',
              level: 3,
              isNew: true,
            },
            {
              id: randomId(),
              name: 'Linking & Navigation',
              link: '/docs/routing/linking-and-navigation',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Dynamic Routes',
              link: '/docs/routing/dynamic-routes',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Active Links',
              link: '/docs/routing/active-link',
              level: 3,
              isNew: true,
            },
            {
              id: randomId(),
              name: 'Error Handling',
              link: '/docs/routing/error-handling',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Redirecting',
              link: '/docs/routing/redirecting',
              level: 3,
            },
          ],
        },
        {
          id: randomId(),
          name: 'Rendering',
          level: 2,
          children: [
            {
              id: randomId(),
              name: 'Server Side Rendering',
              link: '/docs/rendering/ssr',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Client Side Rendering',
              link: '/docs/rendering/csr',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Prerendering',
              link: '/docs/rendering/prerendering',
              level: 3,
              visible: false,
            },
          ],
        },
        {
          id: randomId(),
          name: 'Styling',
          level: 2,
          children: [
            {
              id: randomId(),
              name: 'CSS Modules',
              link: '/docs/styling/css-modules',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Tailwind CSS',
              link: '/docs/styling/tailwindcss',
              level: 3,
            },
            {
              id: randomId(),
              name: 'CSS Preprocessors',
              link: '/docs/styling/preprocessors',
              level: 3,
            },
          ],
        },
        {
          id: randomId(),
          name: 'Optimizing',
          level: 2,
          children: [
            {
              id: randomId(),
              name: 'Images',
              link: '/docs/optimizing/images',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Metadata',
              link: '/docs/optimizing/metadata',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Static Assets',
              link: '/docs/optimizing/static-assets',
              level: 3,
            },
            {
              id: randomId(),
              name: 'React Compiler',
              link: '/docs/optimizing/react-compiler',
              level: 3,
              isNew: true,
            },
          ],
        },
        {
          id: randomId(),
          name: 'Configuring',
          level: 2,
          children: [
            {
              id: randomId(),
              name: 'TypeScript',
              link: '/docs/configuring/typescript',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Environment Variables',
              link: '/docs/configuring/environment-variables',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Modules Aliases',
              link: '/docs/configuring/modules-aliases',
              level: 3,
            },
          ],
        },
        {
          id: randomId(),
          name: 'Deploying',
          level: 2,
          children: [
            {
              id: randomId(),
              name: 'Vercel',
              link: '/docs/deploying/vercel',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Node Server',
              link: '/docs/deploying/node',
              level: 3,
            },
          ],
        },
      ],
    },
    {
      id: randomId(),
      name: 'API REFERENCE',
      icon: <Unplug size={20} />,
      level: 1,
      children: [
        {
          id: randomId(),
          name: 'Components',
          level: 2,
          children: [
            {
              id: randomId(),
              name: 'Link',
              link: '/docs/api-reference/components/link',
              level: 3,
            },
            {
              id: randomId(),
              name: 'NavLink',
              link: '/docs/api-reference/components/navlink',
              level: 3,
              isNew: true,
            },
            {
              id: randomId(),
              name: 'Outlet',
              link: '/docs/api-reference/components/outlet',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Component',
              link: '/docs/api-reference/components/component',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Template',
              link: '/docs/api-reference/components/template',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Layout Component',
              link: '/docs/api-reference/components/layout-component',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Page Component',
              link: '/docs/api-reference/components/page-component',
              level: 3,
            },
            {
              id: randomId(),
              name: 'Router Component',
              link: '/docs/api-reference/components/router-component',
              level: 3,
            },
            {
              id: randomId(),
              name: 'ScrollRestoration',
              link: '/docs/api-reference/components/scroll-restoration',
              level: 3,
              isNew: true,
            },
          ],
        },
        {
          id: randomId(),
          name: 'Functions',
          level: 2,
          children: [
            {
              id: randomId(),
              name: 'defineConfig',
              link: '/docs/api-reference/functions/define-config',
              level: 3,
            },
            {
              id: randomId(),
              name: 'defineRouter',
              link: '/docs/api-reference/functions/define-router',
              level: 3,
            },
            {
              id: randomId(),
              name: 'defineRoutesGroup',
              link: '/docs/api-reference/functions/define-routes-group',
              level: 3,
            },
            {
              id: randomId(),
              name: 'renderApp',
              link: '/docs/api-reference/functions/render-app',
              level: 3,
            },
          ],
        },
        {
          id: randomId(),
          name: 'File Conventions',
          level: 2,
          children: [
            {
              id: randomId(),
              name: '[name].layout.js',
              link: '/docs/api-reference/conventions/layout-component',
              level: 3,
            },
            {
              id: randomId(),
              name: '[name].router.js',
              link: '/docs/api-reference/conventions/router-component',
              level: 3,
            },
            {
              id: randomId(),
              name: '[name].page.js',
              link: '/docs/api-reference/conventions/page-component',
              level: 3,
            },
          ],
        },
        {
          id: randomId(),
          name: 'rasengan.config.js',
          link: '/docs/api-reference/rasengan-config',
          level: 2,
          children: [],
        },
        {
          id: randomId(),
          name: 'create-rasengan CLI',
          link: '/docs/api-reference/create-rasengan-cli',
          level: 2,
          children: [],
        },
        {
          id: randomId(),
          name: 'Rasengan CLI',
          link: '/docs/api-reference/rasengan-cli',
          level: 2,
          children: [],
        },
      ],
    },
  ],

  [NavigationGroup.PACKAGES]: [
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
          isNew: true,
          isBeta: true,
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
  ],

  [NavigationGroup.NAVBAR]: [
    {
      id: randomId(),
      name: 'Docs',
      level: 1,
      link: '/docs/getting-started/introduction',
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
  ],
};
