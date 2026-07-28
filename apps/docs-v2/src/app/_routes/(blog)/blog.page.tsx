import { PageComponent } from 'rasengan';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Search } from 'lucide-react';
import BlogCard from '@/components/common/molecules/blog-card';
import CTA from '@/components/common/molecules/cta';
import { useBlogStore } from '@/store/blog';

const Page: PageComponent = () => {
  const { blog: posts } = useBlogStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Blog
          </h2>
          <h1 className="mb-4 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight text-foreground">
            Insights, tips, and{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
              updates
            </span>
          </h1>
          <p className="max-w-[600px] text-lg leading-relaxed text-foreground/70">
            Stay up to date with the latest Rasengan.js releases, tutorials, and
            community news.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mt-10 max-w-md"
        >
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-full rounded-xl border border-border/60 bg-background pl-11 pr-4 text-foreground placeholder:text-foreground/40 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
        </motion.div>
      </section>

      <section className="pb-16 lg:pb-24">
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="mb-2 text-lg text-foreground/50">No posts found</p>
            <p className="text-sm text-foreground/40">
              Try a different search term.
            </p>
          </motion.div>
        )}
      </section>

      <section className="pb-16 lg:pb-24">
        <CTA />
      </section>
    </div>
  );
};

Page.metadata = {
  title: 'Rasengan.js - Blog',
  description: 'Discover the latest news and updates about Rasengan.js.',
  openGraph: {
    title: 'Rasengan.js - Blog',
    description: 'Discover the latest news and updates about Rasengan.js.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/blog.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - Blog',
    description: 'Discover the latest news and updates about Rasengan.js.',
    image: 'https://rasengan.dev/assets/images/metadata/blog.png',
  },
};

export default Page;
