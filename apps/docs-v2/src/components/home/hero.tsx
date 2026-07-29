import { useState } from 'react';
import { Link } from 'rasengan';
import { ArrowRight, Check, Copy } from 'lucide-react';
import Button from '@/components/common/atoms/buttons/button';
import CodeEditor from '@/components/home/showcase';
import type { HighlightedFramework } from '@/data/home/highlight';

const INSTALL_COMMAND = 'npx create-rasengan@latest';

export default function Hero({
  frameworks,
}: {
  frameworks: HighlightedFramework[];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-160px] h-[420px] w-[80%] -translate-x-1/2 rounded-full bg-linear-to-b from-primary via-primary/40 to-transparent opacity-20 blur-3xl dark:opacity-40" />
      </div>

      <Link
        to="/blog/rasengan-futon-and-server"
        className="group mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 py-1.5 pl-1.5 pr-4 text-sm font-medium text-primary transition-colors duration-200 ease-out hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
          New
        </span>
        <span>Introducing Futon &amp; Rasengan Server</span>
        <ArrowRight
          size={14}
          className="motion-safe:group-hover:translate-x-1 transition-transform duration-200 ease-out"
        />
      </Link>

      <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] font-bold text-foreground max-w-[820px]">
        Beyond the Frontend.
        <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
          Built for the Full Stack.
        </span>
      </h1>

      <p className="mt-6 text-lg lg:text-xl text-foreground/70 max-w-[620px] leading-relaxed">
        Rasengan.js pairs a modern React meta-framework with Futon and Rasengan
        Server — one ecosystem covering every layer of your stack, from
        rendering to WebSockets.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/docs/getting-started/introduction"
          className="w-full sm:w-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Button className="group bg-primary text-primary-foreground h-[48px] px-8 w-full sm:w-auto flex items-center justify-center gap-2">
            Get Started
            <ArrowRight
              size={16}
              className="motion-safe:group-hover:translate-x-1 transition-transform ease-out duration-200"
            />
          </Button>
        </Link>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy install command"
          className="h-[48px] px-6 rounded-md border border-border font-mono text-sm text-foreground flex items-center gap-3 cursor-pointer hover:bg-muted transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>{INSTALL_COMMAND}</span>
          {copied ? (
            <Check size={14} className="text-primary" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>

      <div className="relative mt-16 w-full max-w-[1200px]">
        <CodeEditor frameworks={frameworks} />
      </div>
    </section>
  );
}
