import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCopy } from '@/hooks/use-copy';

type Props = {
  command: string;
  className?: string;
};

/**
 * A `$ command` box with a copy button, used for install commands across the
 * landing, skills and CTA sections. The whole box is the button, so it is one
 * large click target with a clear accessible label.
 */
export default function CommandCopy({ command, className }: Props) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(command)}
      aria-label={`Copy command: ${command}`}
      className={cn(
        'group inline-flex h-11 max-w-full cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 font-mono text-[13px] text-foreground',
        'transition-colors duration-200 ease-out hover:bg-muted',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
    >
      <span aria-hidden="true" className="text-foreground/40">
        $
      </span>
      <span className="truncate">{command}</span>
      {copied ? (
        <Check size={14} aria-hidden="true" className="shrink-0 text-primary" />
      ) : (
        <Copy
          size={14}
          aria-hidden="true"
          className="shrink-0 text-foreground/50 transition-colors group-hover:text-foreground"
        />
      )}
    </button>
  );
}
