import { PageComponent, Link } from 'rasengan';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Copy, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import CTA from '@/components/common/molecules/cta';
import CommandCopy from '@/components/common/molecules/command-copy';
import PageHeader from '@/components/common/molecules/page-header';
import { useCopy } from '@/hooks/use-copy';
import {
  INSTALL_ALL_SKILLS_COMMAND,
  SkillGroups,
  skillInstallCommand,
  type SkillGroup,
} from '@/data/skills';

type GroupFilter = SkillGroup['id'] | 'all';

const TOTAL_SKILLS = SkillGroups.reduce((n, g) => n + g.skills.length, 0);

/**
 * Agent skills catalog (Direction A).
 *
 * Skills are listed as selectable rows grouped by layer. Ticking rows builds
 * the install command in a sticky bar at the bottom of the list, so people
 * install exactly the skills their project needs. A sidebar filters by layer
 * on desktop; on mobile it becomes a row of chips.
 */
const Page: PageComponent = () => {
  const [filter, setFilter] = useState<GroupFilter>('all');
  const [selected, setSelected] = useState<string[]>([]);
  const { copied, copy } = useCopy();

  const groups = useMemo(
    () =>
      filter === 'all'
        ? SkillGroups
        : SkillGroups.filter((g) => g.id === filter),
    [filter]
  );

  /** One `npx skills add` per selected skill, chained so it runs as one line. */
  const command = selected.map(skillInstallCommand).join(' && ');

  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((s) => s !== id) : [...current, id]
    );

  /** Selects every skill of a group, or clears them if all are already selected. */
  const toggleGroup = (group: SkillGroup) => {
    const ids = group.skills.map((s) => s.id);
    const allSelected = ids.every((id) => selected.includes(id));
    setSelected((current) =>
      allSelected
        ? current.filter((id) => !ids.includes(id))
        : [...current, ...ids.filter((id) => !current.includes(id))]
    );
  };

  const filters: Array<{
    id: GroupFilter;
    name: string;
    count: number;
    color?: string;
  }> = [
    { id: 'all', name: 'All skills', count: TOTAL_SKILLS },
    ...SkillGroups.map((g) => ({
      id: g.id,
      name: g.name,
      count: g.skills.length,
      color: g.accent,
    })),
  ];

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <PageHeader
        eyebrow="Agent skills"
        title="Teach your coding agent the whole stack"
        description="Skills are instructions your AI assistant loads when it works on Rasengan, Futon or Rasengan Server code. Pick the ones your project needs, or install all of them."
        aside={<CommandCopy command={INSTALL_ALL_SKILLS_COMMAND} />}
      />

      <div className="grid grid-cols-1 gap-8 pb-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Layer filter: sidebar on desktop, chip row on mobile */}
        <aside className="lg:sticky lg:top-[84px] lg:self-start">
          <div
            role="group"
            aria-label="Filter skills by layer"
            className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  'max-lg:rounded-full max-lg:border max-lg:border-border',
                  filter === f.id
                    ? 'bg-muted font-semibold text-foreground'
                    : 'text-foreground/70 hover:bg-muted/60 hover:text-foreground'
                )}
              >
                <span className="flex items-center gap-2">
                  {f.color && (
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: f.color }}
                      className="size-2 rounded-full"
                    />
                  )}
                  {f.name}
                </span>
                <span className="font-mono text-xs text-foreground/40">
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 hidden border-t border-border pt-6 lg:grid lg:gap-1">
            <a
              href="/llms.txt"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <FileText size={14} aria-hidden="true" />
              llms.txt
            </a>
            <Link
              to="https://github.com/rasengan-dev/agent-skills"
              target="_blank"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ArrowUpRight size={14} aria-hidden="true" />
              agent-skills repo
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="overflow-hidden rounded-xl border border-border">
            {groups.map((group) => {
              const allSelected = group.skills.every((s) =>
                selected.includes(s.id)
              );
              return (
                <section key={group.id} aria-labelledby={`skills-${group.id}`}>
                  <header className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-2.5">
                    <span
                      aria-hidden="true"
                      style={{ backgroundColor: group.accent }}
                      className="size-2 rounded-full"
                    />
                    <h2
                      id={`skills-${group.id}`}
                      className="font-mono text-xs font-semibold uppercase tracking-[0.06em] text-foreground"
                    >
                      {group.name}
                    </h2>
                    <span className="hidden text-xs text-foreground/50 sm:inline">
                      {group.tagline}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleGroup(group)}
                      className="ml-auto cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-foreground/60 transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {allSelected ? 'Clear' : 'Select all'}
                    </button>
                  </header>

                  <ul>
                    {group.skills.map((skill) => {
                      const checked = selected.includes(skill.id);
                      return (
                        <li key={skill.id} className="border-b border-border">
                          <label
                            style={
                              { '--c': group.accent } as React.CSSProperties
                            }
                            className={cn(
                              'grid cursor-pointer grid-cols-[20px_32px_minmax(0,1fr)] items-start gap-3 px-4 py-3 transition-colors duration-150 sm:grid-cols-[20px_32px_220px_minmax(0,1fr)] sm:items-center',
                              checked
                                ? 'bg-[color-mix(in_oklab,var(--c)_6%,transparent)]'
                                : 'hover:bg-muted/40'
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggle(skill.id)}
                              className="mt-1.5 size-4 cursor-pointer accent-[var(--c)] sm:mt-0"
                            />
                            <span
                              aria-hidden="true"
                              className="flex size-8 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--c)_12%,transparent)] text-[var(--c)]"
                            >
                              <skill.icon size={15} />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate font-mono text-[13px] font-medium text-foreground">
                                {skill.id}
                              </span>
                              <span className="mt-0.5 block text-sm text-foreground/60 sm:hidden">
                                {skill.description}
                              </span>
                            </span>
                            <span className="hidden text-sm text-foreground/60 sm:block">
                              {skill.description}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          {/* Command builder: sticks to the bottom of the viewport while the list scrolls */}
          <div className="sticky bottom-4 z-10 mt-4 flex flex-col gap-3 rounded-xl border border-border bg-background/90 p-3 shadow-[0_18px_40px_-24px_rgba(15,26,51,0.5)] backdrop-blur-md sm:flex-row sm:items-center">
            <span
              className="shrink-0 px-1 text-sm text-foreground/70"
              aria-live="polite"
            >
              {selected.length} selected
            </span>
            <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-lg bg-[#0b1020] px-3 py-2.5 font-mono text-xs text-[#c9d4f2]">
              {command || 'Tick skills above to build the install command'}
            </code>
            <div className="flex shrink-0 gap-2">
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  aria-label="Clear selection"
                  className="flex h-9 cursor-pointer items-center justify-center rounded-lg border border-border px-3 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                disabled={!command}
                onClick={() => copy(command)}
                className="flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
              >
                {copied ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <Copy size={14} aria-hidden="true" />
                )}
                {copied ? 'Copied' : 'Copy command'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CTA
        title="Your agent knows the stack. Now build."
        description="Scaffold a project and let your assistant handle routing, loaders, modules and deployment with the skills installed."
      />
    </div>
  );
};

Page.metadata = {
  title: 'Rasengan.js - AI Agent Skills',
  description:
    'Agent skills that teach AI coding assistants Rasengan, Futon and Rasengan Server: routing, pages, config, modules, WebSockets, queues and deployment.',
  openGraph: {
    title: 'Rasengan.js - AI Agent Skills',
    description:
      'Agent skills that teach AI coding assistants Rasengan, Futon and Rasengan Server.',
    url: 'https://rasengan.dev/skills',
    image: 'https://rasengan.dev/assets/images/metadata/skills.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - AI Agent Skills',
    description:
      'Agent skills that teach AI coding assistants Rasengan, Futon and Rasengan Server.',
    image: 'https://rasengan.dev/assets/images/metadata/skills.png',
  },
};

export default Page;
