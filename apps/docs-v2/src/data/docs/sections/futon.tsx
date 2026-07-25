import { Blocks, Handshake, Unplug } from 'lucide-react';
import { randomId } from '@/utils';
import { NavigationItem } from '../types';

export const futonNavigation: NavigationItem[] = [
  {
    id: randomId(),
    name: 'GETTING STARTED',
    icon: <Handshake size={20} />,
    level: 1,
    children: [
      {
        id: randomId(),
        name: 'Introduction',
        link: '/docs/futon/getting-started/introduction',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Installation',
        link: '/docs/futon/getting-started/installation',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Quick Start',
        link: '/docs/futon/getting-started/quick-start',
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
            name: 'Router',
            link: '/docs/futon/routing/router',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Route Patterns',
            link: '/docs/futon/routing/route-patterns',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Route Groups',
            link: '/docs/futon/routing/route-groups',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'Context',
        level: 2,
        children: [
          {
            id: randomId(),
            name: 'Context Object',
            link: '/docs/futon/context/overview',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Query Parameters',
            link: '/docs/futon/context/query-params',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'Request & Response',
        level: 2,
        children: [
          {
            id: randomId(),
            name: 'Request Utilities',
            link: '/docs/futon/request-response/request',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Response Helpers',
            link: '/docs/futon/request-response/response',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Cookies',
            link: '/docs/futon/request-response/cookies',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'Middleware',
        level: 2,
        children: [
          {
            id: randomId(),
            name: 'Built-in Middleware',
            link: '/docs/futon/middleware/built-in',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Custom Middleware',
            link: '/docs/futon/middleware/custom',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'File Uploads',
        level: 2,
        children: [
          {
            id: randomId(),
            name: 'fileUpload() Middleware',
            link: '/docs/futon/file-uploads/overview',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Storage Engines',
            link: '/docs/futon/file-uploads/storage-engines',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'Error Handling',
        link: '/docs/futon/error-handling',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Hooks',
        link: '/docs/futon/hooks',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Adapters',
        level: 2,
        children: [
          {
            id: randomId(),
            name: 'Express Adapter',
            link: '/docs/futon/adapters/express',
            level: 3,
          },
          {
            id: randomId(),
            name: 'WinterCG Adapter',
            link: '/docs/futon/adapters/wintercg',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Runtime Adapters (Node, Bun, Workerd)',
            link: '/docs/futon/adapters/runtime',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'Performance',
        level: 2,
        children: [
          {
            id: randomId(),
            name: 'Lazy Request (opt-in)',
            link: '/docs/futon/performance/lazy-request',
            level: 3,
            isNew: true,
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
        name: 'Futon',
        link: '/docs/futon/api-reference/futon',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Router',
        link: '/docs/futon/api-reference/router',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Middleware',
        link: '/docs/futon/api-reference/middleware',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Upload',
        link: '/docs/futon/api-reference/upload',
        level: 2,
      },
    ],
  },
];
