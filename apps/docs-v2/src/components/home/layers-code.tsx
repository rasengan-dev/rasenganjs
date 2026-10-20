import CodeEditor from '@/components/home/showcase';
import LayerChip from '@/components/common/atoms/badges/layer-chip';
import type { HighlightedFramework } from '@/data/home/highlight';

/**
 * "Pick a layer" section: the existing interactive code editor (one project
 * per layer, real files highlighted by Shiki in the page loader), framed with
 * a heading that explains the three layers share the same conventions.
 * Replaces the old six-card features grid.
 */
export default function LayersCode({
  frameworks,
}: {
  frameworks: HighlightedFramework[];
}) {
  return (
    <section className="mx-auto max-w-[1200px] py-16 lg:py-24">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[620px]">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-foreground/50">
            Pick a layer
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-foreground lg:text-4xl">
            Same conventions at every level
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">
            A page is a file, a route is a function, a feature is a module.
            Browse a real starter project for each layer.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <LayerChip layer="rasengan" label="name" />
          <LayerChip layer="futon" label="name" />
          <LayerChip layer="server" label="name" />
        </div>
      </div>

      <div className="mt-10">
        <CodeEditor frameworks={frameworks} />
      </div>
    </section>
  );
}
