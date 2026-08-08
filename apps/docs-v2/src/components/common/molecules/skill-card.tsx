import { useState } from 'react';
import { Check, Copy, LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type Skill = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

type Props = {
  skill: Skill;
  accent: string;
};

export default function SkillCard({ skill, accent }: Props) {
  const [copied, setCopied] = useState(false);
  const command = `npx skills add rasengan-dev/agent-skills@${skill.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <article
      style={{ '--c': accent } as React.CSSProperties}
      className="group flex flex-col gap-3 rounded-xl border border-border/40 bg-background p-5 transition-all duration-300 hover:border-[var(--c)]/40 hover:shadow-lg hover:shadow-[var(--c)]/5"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          style={{ color: accent, backgroundColor: `${accent}1f` }}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg"
        >
          <skill.icon size={18} />
        </span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy install command"
          className="flex shrink-0 items-center justify-center rounded-md p-2 text-foreground/40 transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? (
            <Check size={14} style={{ color: accent }} />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>

      <div>
        <h3 className="font-mono text-sm font-semibold text-foreground">
          {skill.id}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
          {skill.description}
        </p>
      </div>

      <code
        className={twMerge(
          'mt-auto truncate rounded-md bg-muted/50 px-2.5 py-1.5 font-mono text-xs text-foreground/50'
        )}
      >
        {command}
      </code>
    </article>
  );
}
