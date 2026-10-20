import { cn } from '@/lib/utils';

type Props = {
  /** Small monospace label above the title, e.g. "Agent skills". */
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-hand slot on wide screens (filters, actions). Stacks below on mobile. */
  aside?: React.ReactNode;
  className?: string;
};

/**
 * Shared header for the Skills, Blog and Showcase pages. Replaces the
 * copy-pasted eyebrow + gradient H1 blocks those pages used to carry.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  aside,
  className,
}: Props) {
  return (
    <header
      className={cn(
        'flex flex-col gap-6 pt-14 pb-8 lg:flex-row lg:items-end lg:justify-between lg:pt-20',
        className
      )}
    >
      <div className="max-w-[720px]">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-foreground/50">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-foreground/70">
            {description}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </header>
  );
}
