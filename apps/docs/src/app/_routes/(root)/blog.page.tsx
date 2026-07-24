import BlogCard from '@/components/common/molecules/blog-card';
import CTA from '@/components/common/molecules/cta';
import { useBlogStore } from '@/store/blog';
import { PageComponent } from 'rasengan';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Search } from 'lucide-react';

const Page: PageComponent = () => {
  const { blog: posts } = useBlogStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Blog
          </h2>
          <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-foreground leading-tight mb-4">
            Insights, tips, and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              updates
            </span>
          </h1>
          <p className="text-foreground/70 text-lg max-w-[600px] leading-relaxed">
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-border/60 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
          />
        </motion.div>
      </section>

      <section className="px-4 sm:px-6 lg:px-20 pb-16 lg:pb-24">
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
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
            className="text-center py-20"
          >
            <p className="text-foreground/50 text-lg mb-2">No posts found</p>
            <p className="text-foreground/40 text-sm">
              Try a different search term.
            </p>
          </motion.div>
        )}
      </section>

      <section className="px-4 sm:px-6 lg:px-20 pb-16 lg:pb-24">
        <CTA />
      </section>
    </section>
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
