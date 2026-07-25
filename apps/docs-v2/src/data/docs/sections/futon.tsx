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
        link: '/futon/getting-started/introduction',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Installation',
        link: '/futon/getting-started/installation',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Quick Start',
        link: '/futon/getting-started/quick-start',
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
            link: '/futon/routing/router',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Route Patterns',
            link: '/futon/routing/route-patterns',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Route Groups',
            link: '/futon/routing/route-groups',
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
            link: '/futon/context/overview',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Query Parameters',
            link: '/futon/context/query-params',
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
            link: '/futon/request-response/request',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Response Helpers',
            link: '/futon/request-response/response',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Cookies',
            link: '/futon/request-response/cookies',
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
            link: '/futon/middleware/built-in',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Custom Middleware',
            link: '/futon/middleware/custom',
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
            link: '/futon/file-uploads/overview',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Storage Engines',
            link: '/futon/file-uploads/storage-engines',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'Error Handling',
        link: '/futon/error-handling',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Hooks',
        link: '/futon/hooks',
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
            link: '/futon/adapters/express',
            level: 3,
          },
          {
            id: randomId(),
            name: 'WinterCG Adapter',
            link: '/futon/adapters/wintercg',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Runtime Adapters (Node, Bun, Workerd)',
            link: '/futon/adapters/runtime',
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
            link: '/futon/performance/lazy-request',
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
        link: '/futon/api-reference/futon',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Router',
        link: '/futon/api-reference/router',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Middleware',
        link: '/futon/api-reference/middleware',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Upload',
        link: '/futon/api-reference/upload',
        level: 2,
      },
    ],
  },
];
