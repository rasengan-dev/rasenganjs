import { Link } from 'rasengan';
import {
  Boxes,
  FolderTree,
  Globe,
  Layers,
  Radio,
  Workflow,
} from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  name: string;
  description: string;
  href: string;
  pillar: string;
};

const features: Feature[] = [
  {
    icon: <Layers size={20} />,
    name: 'SSR & SSG',
    description:
      'Render on the server, pre-render at build time, or both — pick per route.',
    href: '/docs/rendering/ssr',
    pillar: 'Rasengan',
  },
  {
    icon: <FolderTree size={20} />,
    name: 'File-based Routing',
    description:
      'Pages inferred straight from your folder structure — no route config to maintain.',
    href: '/docs/routing/file-based-routing',
    pillar: 'Rasengan',
  },
  {
    icon: <Globe size={20} />,
    name: 'Runtime Agnostic',
    description:
      'One codebase that runs unmodified on Node, Bun, Deno, and Cloudflare Workers.',
    href: '/docs/futon/adapters/wintercg',
    pillar: 'Futon',
  },
  {
    icon: <Workflow size={20} />,
    name: 'Composable Middleware',
    description:
      'Koa-style onion model, with CORS, auth, compression, and uploads built in.',
    href: '/docs/futon/middleware/built-in',
    pillar: 'Futon',
  },
  {
    icon: <Boxes size={20} />,
    name: 'Dependency Injection',
    description:
      'Module-scoped providers with lifecycle hooks — no extra DI library needed.',
    href: '/docs/server/dependency-injection/providers',
    pillar: 'Rasengan Server',
  },
  {
    icon: <Radio size={20} />,
    name: 'WebSockets',
    description:
      'Runtime-agnostic WebSocket routes, registered the same way as your HTTP routes.',
    href: '/docs/server/core-concepts/websockets',
    pillar: 'Rasengan Server',
  },
];

export default function Features() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[620px] text-center">
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          Why This Ecosystem
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/70">
          Six capabilities, two from each pillar — the same care put into the
          frontend shows up in the runtime and the backend too.
        </p>
      </div>

      <div className="mt-12 max-w-[1200px] mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Link
            key={feature.name}
            to={feature.href}
            className="group flex flex-col rounded-xl border border-border p-6 transition-colors duration-200 ease-out hover:border-primary/50 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="flex items-center justify-between">
              <div
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                {feature.icon}
              </div>

              <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-foreground/50">
                {feature.pillar}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {feature.name}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
