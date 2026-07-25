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
        link: '/server/getting-started/introduction',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Installation',
        link: '/server/getting-started/installation',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Project Structure',
        link: '/server/getting-started/project-structure',
        level: 2,
      },
      {
        id: randomId(),
        name: 'CLI',
        link: '/server/getting-started/cli',
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
        link: '/server/core-concepts/bootstrap',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Modules',
        link: '/server/core-concepts/modules',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Controllers & Routing',
        link: '/server/core-concepts/controllers',
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
            link: '/server/dependency-injection/providers',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Module Scoping',
            link: '/server/dependency-injection/scoping',
            level: 3,
          },
          {
            id: randomId(),
            name: 'Lifecycle Hooks',
            link: '/server/dependency-injection/lifecycle',
            level: 3,
          },
        ],
      },
      {
        id: randomId(),
        name: 'Middleware',
        link: '/server/core-concepts/middleware',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Validation',
        link: '/server/core-concepts/validation',
        level: 2,
      },
      {
        id: randomId(),
        name: 'File Uploads',
        link: '/server/core-concepts/file-uploads',
        level: 2,
      },
      {
        id: randomId(),
        name: 'WebSockets',
        link: '/server/core-concepts/websockets',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Module Plugins',
        link: '/server/core-concepts/module-plugins',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Config & Build',
        link: '/server/core-concepts/config-and-build',
        level: 2,
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
        link: '/server/ecosystem/websocket-gateways',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Background Queues',
        link: '/server/ecosystem/queues',
        level: 2,
        isBeta: true,
      },
      {
        id: randomId(),
        name: 'Validation Adapters',
        link: '/server/ecosystem/validation-adapters',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Database (Drizzle)',
        link: '/server/ecosystem/drizzle',
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
        link: '/server/api-reference/server-app',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Controller',
        link: '/server/api-reference/controller',
        level: 2,
      },
      {
        id: randomId(),
        name: 'Container',
        link: '/server/api-reference/container',
        level: 2,
      },
      {
        id: randomId(),
        name: 'defineModule',
        link: '/server/api-reference/define-module',
        level: 2,
      },
      {
        id: randomId(),
        name: 'CLI',
        link: '/server/api-reference/cli',
        level: 2,
      },
    ],
  },
];
