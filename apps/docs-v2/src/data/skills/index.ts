import {
  BookOpen,
  Route,
  Settings,
  Database,
  Palette,
  Rocket,
  Sparkles,
  CloudUpload,
  Box,
  Zap,
  Plug,
  Server,
  ShieldCheck,
  Network,
  ListOrdered,
  FileUp,
} from 'lucide-react';
import type { Skill } from '@/components/common/molecules/skill-card';

export type SkillGroup = {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  skills: Array<Skill>;
};

export const SkillGroups: Array<SkillGroup> = [
  {
    id: 'rasengan',
    name: 'Rasengan',
    tagline: 'The frontend meta-framework',
    accent: 'var(--color-primary)',
    skills: [
      {
        id: 'rasengan-pages',
        name: 'Pages',
        description:
          'Page/layout components, metadata, MDX pages, entry points, navigation, 404.',
        icon: BookOpen,
      },
      {
        id: 'rasengan-routing',
        name: 'Routing',
        description:
          'Router definition, config-based/file-based routing, dynamic routes, navigation hooks.',
        icon: Route,
      },
      {
        id: 'rasengan-config',
        name: 'Config',
        description:
          'Project configuration, SSR/SSG/SPA modes, CLI commands, TypeScript, env vars.',
        icon: Settings,
      },
      {
        id: 'rasengan-data-fetching',
        name: 'Data fetching',
        description:
          'Loader functions, SSG static path generation, loading states.',
        icon: Database,
      },
      {
        id: 'rasengan-styling',
        name: 'Styling',
        description:
          'CSS Modules, Tailwind CSS, Sass/Less/Stylus preprocessors.',
        icon: Palette,
      },
      {
        id: 'rasengan-project-setup',
        name: 'Project setup',
        description:
          'Project scaffolding, create-rasengan CLI, file structure, TypeScript setup.',
        icon: Rocket,
      },
      {
        id: 'rasengan-optimizing',
        name: 'Optimizing',
        description:
          'Static assets (public/), metadata/SEO, Sage Mode / React Compiler.',
        icon: Sparkles,
      },
      {
        id: 'rasengan-deployment',
        name: 'Deployment',
        description: 'Vercel adapter, Node.js self-hosting, build output.',
        icon: CloudUpload,
      },
      {
        id: 'rasengan-ecosystem',
        name: 'Ecosystem',
        description: 'Kurama, Image, Theme, i18n, Kage Demo, MDX.',
        icon: Box,
      },
    ],
  },
  {
    id: 'futon',
    name: 'Futon',
    tagline: 'The WinterCG-compatible HTTP runtime',
    accent: '#14B8A6',
    skills: [
      {
        id: 'rasengan-futon-core',
        name: 'Core',
        description:
          'Futon app class, middleware onion model, built-in middleware, Context, response helpers, cookies, hooks, HttpError.',
        icon: Zap,
      },
      {
        id: 'rasengan-futon-routing',
        name: 'Routing',
        description:
          'Router class, route groups, radix-tree dispatch, path param types, body parsing.',
        icon: Route,
      },
      {
        id: 'rasengan-futon-adapters',
        name: 'Adapters',
        description:
          'RuntimeAdapter interface, Node/Bun/Workerd adapters, Express and WinterCG bridges.',
        icon: Plug,
      },
    ],
  },
  {
    id: 'server',
    name: 'Rasengan Server',
    tagline: 'The modular backend framework',
    accent: '#B06BFF',
    skills: [
      {
        id: 'rasengan-server-core',
        name: 'Core',
        description:
          'bootstrap, ServerApp, modules, controllers, DI/Container, config, CLI.',
        icon: Server,
      },
      {
        id: 'rasengan-server-validation',
        name: 'Validation',
        description:
          'Zod schema validation, per-route and controller-level schemas.',
        icon: ShieldCheck,
      },
      {
        id: 'rasengan-server-websockets',
        name: 'WebSockets',
        description:
          'Raw app.websocket(), @rasenganjs/ws Gateways, rooms, broadcasting.',
        icon: Network,
      },
      {
        id: 'rasengan-server-queues',
        name: 'Queues',
        description:
          '@rasenganjs/queue background jobs, retries/backoff, recurring jobs.',
        icon: ListOrdered,
      },
      {
        id: 'rasengan-server-uploads',
        name: 'Uploads',
        description:
          "Multipart file uploads via futon's fileUpload() + diskStorage().",
        icon: FileUp,
      },
      {
        id: 'rasengan-server-drizzle',
        name: 'Drizzle',
        description:
          'Drizzle ORM integration — DrizzleModule.forRoot(), DataSource provider, driver adapters, migrations.',
        icon: Database,
      },
    ],
  },
];
