import { Link } from 'rasengan';
import { ArrowRight, LayoutTemplate, Server, Zap } from 'lucide-react';

type Pillar = {
  icon: React.ReactNode;
  name: string;
  description: string;
  href: string;
};

const pillars: Pillar[] = [
  {
    icon: <LayoutTemplate size={20} />,
    name: 'Rasengan',
    description:
      'The React meta-framework. Server rendering, static generation, and file-based routing, built on Vite and React Router.',
    href: '/docs/getting-started/introduction',
  },
  {
    icon: <Zap size={20} />,
    name: 'Futon',
    description:
      'A WinterCG-compatible runtime. Middleware, routing, and request/response utilities that run on Node, Bun, Deno, and Cloudflare Workers.',
    href: '/docs/futon/getting-started/introduction',
  },
  {
    icon: <Server size={20} />,
    name: 'Rasengan Server',
    description:
      'A complete backend framework. Controllers, dependency injection, WebSockets, and background queues, built on top of Futon.',
    href: '/docs/server/getting-started/introduction',
  },
];

export default function Pillars() {
  return (
    <section className="py-16 lg:py-24">
      <div className="text-center max-w-[620px] mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
          One Ecosystem, Three Products
        </h2>
        <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
          Each piece works standalone, and even better together — frontend,
          runtime, and backend, sharing the same conventions.
        </p>
      </div>

      <div className="mt-12 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <Link
            key={pillar.name}
            to={pillar.href}
            className="group flex flex-col rounded-xl border border-border p-6 cursor-pointer transition-colors duration-200 ease-out hover:border-primary/50 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div
              aria-hidden="true"
              className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary"
            >
              {pillar.icon}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {pillar.name}
            </h3>

            <p className="mt-2 text-sm text-foreground/70 leading-relaxed flex-1">
              {pillar.description}
            </p>

            <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
              <span>Learn more</span>
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="motion-safe:group-hover:translate-x-1 transition-transform ease-out duration-200"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
