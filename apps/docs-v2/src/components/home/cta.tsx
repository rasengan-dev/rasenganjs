import { Link } from 'rasengan';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/atoms/buttons/button';

export default function Cta() {
  return (
    <section className="max-w-[1200px] mx-auto py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-border px-8 py-16 text-center lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden"
        >
          <div className="absolute left-1/2 top-1/2 h-[280px] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-primary via-primary/40 to-transparent opacity-10 blur-3xl dark:opacity-25" />
        </div>

        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          Ready to build?
        </h2>

        <p className="mx-auto mt-4 max-w-[500px] text-lg leading-relaxed text-foreground/70">
          Scaffold a new project in seconds — pick Rasengan, Futon, or Rasengan
          Server.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/docs/getting-started/introduction"
            className="w-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            <Button className="group flex h-[48px] w-full items-center justify-center gap-2 bg-primary px-8 text-primary-foreground sm:w-auto">
              Get Started
              <ArrowRight
                size={16}
                className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
              />
            </Button>
          </Link>

          <Link
            to="https://github.com/rasengan-dev/rasenganjs"
            target="_blank"
            className="flex h-[48px] w-full items-center justify-center rounded-md border border-border px-6 text-sm font-medium text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
