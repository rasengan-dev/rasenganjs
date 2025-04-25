import BlogCard from '@/components/molecules/blog-card';
import CTA from '@/components/molecules/cta';
import Heading from '@/components/molecules/heading';
import { useBlogStore } from '@/store/blog';
import { PageComponent } from 'rasengan';

const Blog: PageComponent = () => {
  const { blog: posts } = useBlogStore();

  return (
    <section className="w-full min-h-screen">
      <section className="grid-section relative px-4 xl:px-20 py-20 pt-40 overflow-hidden">
        <Heading
          title="Blog"
          description="Insights, tips, and updates from the Rasengan.js community."
        />

        <div className="relative showcase-containe grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 z-20">
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </section>

      <section className="relative px-4 xl:px-20 py-20 pt-20">
        <CTA />
      </section>
    </section>
  );
};

Blog.path = '/blog';
Blog.metadata = {
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

export default Blog;
