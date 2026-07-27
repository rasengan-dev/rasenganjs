import { Link } from 'rasengan';
import {
  ArrowRight,
  Database,
  FlaskConical,
  Image as ImageIcon,
  Languages,
  ListOrdered,
  MousePointerClick,
  Network,
  Package2,
  Palette,
  ShieldCheck,
  Wifi,
} from 'lucide-react';

type Package = {
  icon: React.ReactNode;
  name: string;
  description: string;
  href: string;
  isBeta?: boolean;
};

const packages: Package[] = [
  {
    icon: <Package2 size={18} />,
    name: 'kurama',
    description: 'Lightweight state management, Zustand-inspired.',
    href: '/packages/kurama',
  },
  {
    icon: <ImageIcon size={18} />,
    name: 'image',
    description: 'Optimized image component with lazy loading.',
    href: '/packages/image',
  },
  {
    icon: <Palette size={18} />,
    name: 'theme',
    description: 'Light, dark, and system theme management.',
    href: '/packages/theme',
  },
  {
    icon: <Languages size={18} />,
    name: 'i18n',
    description: 'Internationalization with locale-aware routing.',
    href: '/packages/i18n',
  },
  {
    icon: <Wifi size={18} />,
    name: 'io',
    description: 'Real-time client for WebSocket gateways.',
    href: '/packages/io',
    isBeta: true,
  },
  {
    icon: <MousePointerClick size={18} />,
    name: 'kage-demo',
    description: 'Interactive feature tours and onboarding flows.',
    href: '/packages/kage-demo',
  },
  {
    icon: <ShieldCheck size={18} />,
    name: 'validators',
    description: 'Schema validation middleware, Zod adapter included.',
    href: '/docs/server/ecosystem/validation-adapters',
    isBeta: true,
  },
  {
    icon: <Network size={18} />,
    name: 'ws',
    description: 'WebSocket gateways with rooms and broadcasting.',
    href: '/packages/ws',
    isBeta: true,
  },
  {
    icon: <ListOrdered size={18} />,
    name: 'queue',
    description: 'Background job queues with retries and dead-letter.',
    href: '/packages/queue',
    isBeta: true,
  },
  {
    icon: <Database size={18} />,
    name: 'drizzle',
    description: 'Drizzle ORM integration for Rasengan Server.',
    href: '/packages/drizzle',
    isBeta: true,
  },
];

export default function Ecosystem() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[620px] text-center">
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          A Growing Ecosystem
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/70">
          Smaller packages that fill in the gaps — state, images, i18n,
          real-time, and more, each usable on its own.
        </p>
      </div>

      <div className="mt-12 max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 rounded-xl border-t border-l border-dashed border-border overflow-hidden">
        {packages.map((pkg) => (
          <Link
            key={pkg.name}
            to={pkg.href}
            className="group relative flex flex-col gap-3 border-r border-b border-dashed border-border p-5 transition-colors duration-200 ease-out hover:z-10 hover:bg-muted/40 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
          >
            <div className="flex items-center justify-between">
              <div
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                {pkg.icon}
              </div>

              {pkg.isBeta && (
                <FlaskConical
                  size={14}
                  aria-label="Beta"
                  className="text-green-500"
                />
              )}
            </div>

            <div>
              <h3 className="font-mono text-sm font-semibold text-foreground">
                {pkg.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-foreground/60">
                {pkg.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/packages"
          className="group flex items-center gap-1.5 rounded-md text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span>Browse all packages</span>
          <ArrowRight
            size={14}
            aria-hidden="true"
            className="motion-safe:group-hover:translate-x-1 transition-transform duration-200 ease-out"
          />
        </Link>
      </div>
    </section>
  );
}
