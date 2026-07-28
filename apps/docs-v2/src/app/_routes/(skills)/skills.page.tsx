import { PageComponent, Link } from 'rasengan';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Check, Copy, Brain, FileText, ArrowUpRight } from 'lucide-react';
import CTA from '@/components/common/molecules/cta';
import SkillCard from '@/components/common/molecules/skill-card';
import { SkillGroups } from '@/data/skills';

const INSTALL_ALL_COMMAND = 'npx skills add rasengan-dev/agent-skills --all';

const Page: PageComponent = () => {
  const [activeGroup, setActiveGroup] = useState('all');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_ALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const groups =
    activeGroup === 'all'
      ? SkillGroups
      : SkillGroups.filter((g) => g.id === activeGroup);

  return (
    <div className="w-full">
      <section className="pt-16 pb-8 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px]"
        >
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Agent Skills
          </h2>
          <h1 className="mb-4 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight text-foreground">
            AI-powered development with{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
              agent skills
            </span>
          </h1>
          <p className="max-w-[600px] text-lg leading-relaxed text-foreground/70">
            Specialized instructions that teach AI coding assistants how to work
            with Rasengan, Futon, and Rasengan Server — from routing to
            deployment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3 pl-4 max-w-xl"
        >
          <code className="flex-1 truncate font-mono text-sm text-foreground">
            {INSTALL_ALL_COMMAND}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy install command"
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {copied ? (
              <>
                <Check size={14} className="text-primary" />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => setActiveGroup('all')}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeGroup === 'all'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-muted text-foreground/70 hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            All
          </button>
          {SkillGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroup(group.id)}
              style={
                activeGroup === group.id
                  ? { backgroundColor: group.accent, color: '#fff' }
                  : undefined
              }
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeGroup === group.id
                  ? 'shadow-lg'
                  : 'bg-muted text-foreground/70 hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {group.name}
            </button>
          ))}
        </motion.div>
      </section>

      <section className="flex flex-col gap-14 pb-16 lg:pb-24">
        {groups.map((group) => (
          <div key={group.id}>
            <div className="mb-5 flex items-baseline gap-3">
              <h2
                style={{ color: group.accent }}
                className="text-lg font-semibold"
              >
                {group.name}
              </h2>
              <span className="text-sm text-foreground/50">
                {group.tagline}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} accent={group.accent} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="pb-16 lg:pb-24">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary">
          Supporting files
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-background p-5 transition-colors duration-300 hover:border-primary/30">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText size={18} />
              </span>
              <h3 className="font-semibold text-foreground">llms.txt</h3>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-foreground/60">
              A comprehensive LLM-readable documentation file covering the
              entire framework — routing, rendering, configuration, packages,
              API reference, and quick-start guides.
            </p>
            <code className="block rounded-md bg-muted/50 px-2.5 py-1.5 font-mono text-xs text-foreground/50">
              docs/public/llms.txt
            </code>
          </div>

          <div className="rounded-xl border border-border/40 bg-background p-5 transition-colors duration-300 hover:border-primary/30">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Brain size={18} />
              </span>
              <h3 className="font-semibold text-foreground">AGENTS.md</h3>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-foreground/60">
              A detailed AI agent codebase guide with project structure,
              architecture, data flow, conventions, and key types — auto-loaded
              by compatible coding agents.
            </p>
            <code className="block rounded-md bg-muted/50 px-2.5 py-1.5 font-mono text-xs text-foreground/50">
              /AGENTS.md
            </code>
          </div>
        </div>

        <Link
          to="https://github.com/rasengan-dev/agent-skills"
          target="_blank"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          View the agent-skills repository
          <ArrowUpRight size={14} />
        </Link>
      </section>

      <section className="pb-16 lg:pb-24">
        <CTA />
      </section>
    </div>
  );
};

Page.metadata = {
  title: 'Rasengan.js - AI Agent Skills',
  description:
    'Enhance your development with Rasengan.js agent skills — AI-powered coding assistance for routing, pages, config, deployment, and more.',
  openGraph: {
    title: 'Rasengan.js - AI Agent Skills',
    description:
      'Enhance your development with Rasengan.js agent skills — AI-powered coding assistance for routing, pages, config, deployment, and more.',
    url: 'https://rasengan.dev/skills',
    image: 'https://rasengan.dev/assets/images/metadata/skills.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - AI Agent Skills',
    description:
      'Enhance your development with Rasengan.js agent skills — AI-powered coding assistance for routing, pages, config, deployment, and more.',
    image: 'https://rasengan.dev/assets/images/metadata/skills.png',
  },
};

export default Page;
