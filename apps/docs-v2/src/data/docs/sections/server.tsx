import { Blocks, Handshake, Puzzle, Unplug } from 'lucide-react';
import { randomId } from '@/utils';
import { NavigationItem } from '../types';

export const serverNavigation: NavigationItem[] = [
  {
    id: randomId(),
    name: 'GETTING STARTED',
    icon: <Handshake size={20} />,
    level: 1,
    children: [
      {
        id: randomId(),
        name: 'Introduction',
        link: '/docs/server/getting-started/introduction',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Installation',
        link: '/docs/server/getting-started/installation',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Project Structure',
        link: '/docs/server/getting-started/project-structure',
        level: 2,
      },
      {
        id: randomId(),
        name: 'CLI',
        link: '/docs/server/getting-started/cli',
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
        name: 'Bootstrap & ServerApp',
        link: '/docs/server/core-concepts/bootstrap',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Modules',
        link: '/docs/server/core-concepts/modules',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Controllers & Routing',
        link: '/docs/server/core-concepts/controllers',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Dependency Injection',
        level: 2,
        children: [
          {
            id: randomId(),
            name: 'Providers & Tokens',
            link: '/docs/server/dependency-injection/providers',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Module Scoping',
            link: '/docs/server/dependency-injection/scoping',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Lifecycle Hooks',
            link: '/docs/server/dependency-injection/lifecycle',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'Middleware',
        link: '/docs/server/core-concepts/middleware',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Validation',
        link: '/docs/server/core-concepts/validation',
        level: 2,
      },
      {
        id: randomId(),
        name: 'File Uploads',
        link: '/docs/server/core-concepts/file-uploads',
        level: 2,
      },
      {
        id: randomId(),
        name: 'WebSockets',
        link: '/docs/server/core-concepts/websockets',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Module Plugins',
        link: '/docs/server/core-concepts/module-plugins',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Config & Build',
        link: '/docs/server/core-concepts/config-and-build',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Environment Variables',
        link: '/docs/server/core-concepts/environment-variables',
        level: 2,
        isNew: true,
      },
    ],
  },
  {
    id: randomId(),
    name: 'SERVER ECOSYSTEM',
    icon: <Puzzle size={20} />,
    level: 1,
    children: [
      {
        id: randomId(),
        name: 'WebSocket Gateways',
        link: '/docs/server/ecosystem/websocket-gateways',
        level: 2,
        isBeta: true,
      },
      {
        id: randomId(),
        name: 'Background Queues',
        link: '/docs/server/ecosystem/queues',
        level: 2,
        isBeta: true,
      },
      {
        id: randomId(),
        name: 'Validation Adapters',
        link: '/docs/server/ecosystem/validation-adapters',
        level: 2,
        isBeta: true,
      },
      {
        id: randomId(),
        name: 'Database (Drizzle)',
        link: '/docs/server/ecosystem/drizzle',
        level: 2,
        isBeta: true,
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
        name: 'ServerApp',
        link: '/docs/server/api-reference/server-app',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Controller',
        link: '/docs/server/api-reference/controller',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Container',
        link: '/docs/server/api-reference/container',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Provider',
        link: '/docs/server/api-reference/provider',
        level: 2,
      },
      {
        id: randomId(),
        name: 'defineModule',
        link: '/docs/server/api-reference/define-module',
        level: 2,
      },
      {
        id: randomId(),
        name: 'WebSocket',
        link: '/docs/server/api-reference/websocket',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Upload',
        link: '/docs/server/api-reference/upload',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Logger',
        link: '/docs/server/api-reference/logger',
        level: 2,
      },
      {
        id: randomId(),
        name: 'defineConfig',
        link: '/docs/server/api-reference/define-config',
        level: 2,
      },
      {
        id: randomId(),
        name: 'CLI',
        link: '/docs/server/api-reference/cli',
        level: 2,
      },
    ],
  },
];
