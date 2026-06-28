import CTA from '@/components/common/molecules/cta';
import { ShowcaseCard } from '@/components/common/molecules/showcase-card';
import { PageComponent } from 'rasengan';
import { motion } from 'motion/react';
import { useState } from 'react';

const projects = [
  {
    image: '/assets/images/showcase/rasenganjs.png',
    title: 'Rasengan.js',
    link: 'https://rasengan.dev',
    category: 'Framework',
  },
  {
    image: '/assets/images/showcase/rasengan-ui.png',
    title: 'Rasengan UI',
    link: 'https://ui.rasengan.dev',
    category: 'UI Library',
  },
  {
    image: '/assets/images/showcase/rasengan-hub.png',
    title: 'Rasengan Hub',
    link: 'https://hub.rasengan.dev',
    category: 'Marketplace',
  },
  {
    image: '/assets/images/showcase/chunin.png',
    title: 'Chunin',
    link: 'https://chunin.rasengan.dev',
    category: 'Tool',
  },
  {
    image: '/assets/images/showcase/nindo.png',
    title: 'Nindo',
    link: 'https://nindo.rasengan.dev',
    category: 'Framework',
  },
  {
    image: '/assets/images/showcase/chidori.png',
    title: 'Chidori',
    link: 'https://chidori.rasengan.dev',
    category: 'Framework',
  },
  {
    image: '/assets/images/showcase/biccas.png',
    title: 'Biccas',
    link: 'https://www.hub.rasengan.dev/templates/rh_landing-biccas',
    category: 'Template',
  },
  {
    image: '/assets/images/showcase/kronix.png',
    title: 'Kronix',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-kronix',
    category: 'Template',
  },
  {
    image: '/assets/images/showcase/enver.png',
    title: 'Enver',
    link: 'https://www.hub.rasengan.dev/templates/rh_landing-enver',
    category: 'Template',
  },
  {
    image: '/assets/images/showcase/rasengan.png',
    title: 'Rasengan',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-rasengan',
    category: 'Template',
  },
  {
    image: '/assets/images/showcase/hano.png',
    title: 'Hano',
    link: 'https://www.hub.rasengan.dev/templates/rh_saas-hano',
    category: 'Template',
  },
];

const categories = [
  'All',
  'Framework',
  'UI Library',
  'Marketplace',
  'Template',
  'Tool',
];

const Page: PageComponent = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="w-full">
      <section className="relative px-4 sm:px-6 lg:px-20 pt-32 pb-16 lg:pb-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px]"
        >
          <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-3">
            Showcase
          </h2>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-foreground leading-tight mb-4">
            Built with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Rasengan.js
            </span>
          </h1>
          <p className="text-foreground/70 text-lg max-w-[600px] leading-relaxed">
            Explore a collection of websites, apps, and templates built by the
            Rasengan.js community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 mt-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-muted text-foreground/70 hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-20 pb-16 lg:pb-24">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <ShowcaseCard
                image={project.image}
                title={project.title}
                link={project.link}
              />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-foreground/50 py-20 text-lg"
          >
            No projects found in this category.
          </motion.p>
        )}
      </section>

      <section className="px-4 sm:px-6 lg:px-20 pb-16 lg:pb-24">
        <CTA />
      </section>
    </section>
  );
};

Page.metadata = {
  title: 'Rasengan.js - Showcase',
  description: 'Explore the showcase of Rasengan.js projects and applications.',
  openGraph: {
    title: 'Rasengan.js - Showcase',
    description:
      'Explore the showcase of Rasenganjs projects and applications.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/showcase.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - Showcase',
    description:
      'Explore the showcase of Rasengan.js projects and applications.',
    image: 'https://rasengan.dev/assets/images/metadata/showcase.png',
  },
};

export default Page;
