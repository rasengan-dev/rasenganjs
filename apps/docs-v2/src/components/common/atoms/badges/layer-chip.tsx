import { cn } from '@/lib/utils';
import { LAYERS, type Layer } from '@/data/ecosystem';

type Props = {
  layer: Layer;
  /** `short` shows "frontend" / "runtime" / "backend"; `name` shows the product name. */
  label?: 'short' | 'name';
  className?: string;
};

/**
 * Small pill that marks something as belonging to one layer of the stack.
 * The color comes from the layer's CSS token, so it follows light/dark mode.
 */
export default function LayerChip({
  layer,
  label = 'short',
  className,
}: Props) {
  const meta = LAYERS[layer];

  return (
    <span
      style={{ '--c': meta.color } as React.CSSProperties}
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[11px] font-medium',
        'border-[color-mix(in_oklab,var(--c)_35%,transparent)] bg-[color-mix(in_oklab,var(--c)_9%,transparent)] text-[var(--c)]',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-[var(--c)]"
      />
      {label === 'short' ? meta.short : meta.name}
    </span>
  );
}
