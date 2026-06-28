import { PageComponent, Link } from 'rasengan';
import { motion } from 'motion/react';
import { AnnonceBadge } from '@/components/common/atoms/badges/badge';
import Button from '@/components/common/atoms/buttons/button';
import {
  Brain,
  BookOpen,
  Wrench,
  Route,
  Settings,
  Database,
  Palette,
  Rocket,
  Code,
  Box,
  ArrowUpRight,
  FileText,
  Sparkles,
  Download,
  Terminal,
} from 'lucide-react';

const skills = [
  {
    name: 'rasengan-pages',
    description:
      'Page/layout components, metadata, MDX pages, entry points, navigation, 404.',
    icon: BookOpen,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-pages',
  },
  {
    name: 'rasengan-routing',
    description:
      'Router definition, config-based/file-based routing, dynamic routes, navigation hooks.',
    icon: Route,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-routing',
  },
  {
    name: 'rasengan-config',
    description:
      'Project configuration, SSR/SSG/SPA modes, CLI commands, TypeScript, env vars.',
    icon: Settings,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-config',
  },
  {
    name: 'rasengan-data-fetching',
    description:
      'Loader functions, SSG static path generation, loading states.',
    icon: Database,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-data-fetching',
  },
  {
    name: 'rasengan-styling',
    description: 'CSS Modules, Tailwind CSS, Sass/Less/Stylus preprocessors.',
    icon: Palette,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-styling',
  },
  {
    name: 'rasengan-project-setup',
    description:
      'Project scaffolding, create-rasengan CLI, file structure, TypeScript setup.',
    icon: Rocket,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-project-setup',
  },
  {
    name: 'rasengan-optimizing',
    description:
      'Static assets (public/), metadata/SEO, Sage Mode / React Compiler.',
    icon: Sparkles,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-optimizing',
  },
  {
    name: 'rasengan-deployment',
    description:
      'Vercel adapter, Node.js self-hosting, build output structure.',
    icon: Rocket,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-deployment',
  },
  {
    name: 'rasengan-ecosystem',
    description: 'Kurama, Image, Theme, i18n, Kage Demo, MDX.',
    icon: Box,
    install: 'npx skills add rasengan-dev/agent-skills@rasengan-ecosystem',
  },
];

const Page: PageComponent = () => {
  return (
    <section className="w-full">
      <section className="relative px-4 sm:px-6 lg:px-20 pt-32 pb-16 lg:pb-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px]"
        >
          <div className="flex justify-start mb-4">
            <AnnonceBadge text="v1.2.2" className="border border-primary/20" />
          </div>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-foreground leading-tight mb-4">
            AI-Powered{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Development
            </span>{' '}
            with Agent Skills
          </h1>
          <p className="text-foreground/70 text-lg max-w-[600px] leading-relaxed">
            Rasengan.js provides specialized agent skills that teach AI coding
            assistants how to work with the framework — from routing to
            deployment.
          </p>
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-20 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
                Available Skills
              </h2>
              <p className="text-2xl font-semibold text-foreground mb-6">
                Choose the skills you need
              </p>

              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group border border-border/40 rounded-xl p-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-background"
                  >
                    <div className="flex items-start gap-4">
                      <span className="size-10 flex items-center justify-center rounded-lg bg-primary/10 shrink-0">
                        <skill.icon className="size-4 text-primary" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {skill.name}
                          </h3>
                          <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            Skill
                          </span>
                        </div>
                        <p className="text-foreground/60 text-sm leading-relaxed">
                          {skill.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <Terminal className="size-3 text-foreground/40 shrink-0" />
                          <code className="text-xs text-foreground/50 font-mono truncate">
                            {skill.install}
                          </code>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
                Quick Install
              </h2>
              <p className="text-2xl font-semibold text-foreground mb-6">
                Install all skills at once
              </p>

              <div className="border border-border/40 rounded-xl p-5 bg-muted/30">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="size-4 text-foreground/60" />
                  <span className="text-sm font-medium text-foreground/80">
                    Terminal
                  </span>
                </div>
                <code className="block text-sm text-foreground font-mono bg-muted/50 rounded-lg p-3 border border-border/40">
                  npx skills add rasengan-dev/agent-skills --all
                </code>
              </div>

              <p className="text-foreground/60 text-sm mt-4">
                Or install individual skills with{' '}
                <code className="text-primary font-mono text-xs">
                  npx skills add
                  rasengan-dev/agent-skills@rasengan-&lt;skill-name&gt; -g -y
                </code>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
                Supporting Files
              </h2>
              <p className="text-2xl font-semibold text-foreground mb-6">
                LLM-readable documentation
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-border/40 rounded-xl p-5 hover:border-primary/30 transition-all duration-300 bg-background">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="size-10 flex items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="size-4 text-primary" />
                    </span>
                    <h3 className="font-semibold text-foreground">llms.txt</h3>
                  </div>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-3">
                    A comprehensive LLM-readable documentation file covering the
                    entire framework — routing, rendering, configuration,
                    packages, API reference, and quick-start guides.
                  </p>
                  <code className="text-xs text-foreground/50 font-mono block bg-muted/50 rounded px-2 py-1">
                    docs/public/llms.txt
                  </code>
                </div>

                <div className="border border-border/40 rounded-xl p-5 hover:border-primary/30 transition-all duration-300 bg-background">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="size-10 flex items-center justify-center rounded-lg bg-primary/10">
                      <Brain className="size-4 text-primary" />
                    </span>
                    <h3 className="font-semibold text-foreground">AGENTS.md</h3>
                  </div>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-3">
                    A detailed AI agent codebase guide with project structure,
                    architecture, data flow, conventions, and key types —
                    auto-loaded by compatible coding agents.
                  </p>
                  <code className="text-xs text-foreground/50 font-mono block bg-muted/50 rounded px-2 py-1">
                    /AGENTS.md
                  </code>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-border/40 rounded-xl p-6 bg-gradient-to-br from-primary/5 via-background to-background"
              >
                <Brain className="size-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  How it works
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  Agent skills are specialized instructions that teach AI coding
                  assistants about specific parts of the Rasengan.js framework.
                  When installed, they provide context-aware code generation,
                  explanations, and best practices.
                </p>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li className="flex items-start gap-2">
                    <Sparkles className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Auto-loaded by compatible coding agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Context-aware code generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Framework-specific best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Always up to date with releases</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-border/40 rounded-xl p-6"
              >
                <Wrench className="size-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Requirements
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  To use agent skills, you need a compatible AI coding assistant
                  that supports the <Code className="inline size-3.5" /> skills
                  protocol.
                </p>
                <Link
                  to="https://github.com/rasengan-dev/agent-skills"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View the repository
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-border/40 rounded-xl p-6"
              >
                <Download className="size-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Get started
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  Run this command in your Rasengan.js project to install all
                  skills:
                </p>
                <div className="bg-muted/50 rounded-lg p-3 border border-border/40 mb-4">
                  <code className="text-xs text-foreground font-mono break-all">
                    npx skills add rasengan-dev/agent-skills --all
                  </code>
                </div>
                <Link to="/docs/getting-started/installation">
                  <Button className="bg-primary text-primary-foreground text-sm w-full">
                    Install Rasengan.js
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

Page.path = '/skills';

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
