import { Outlet, LayoutComponent } from 'rasengan';
import Navbar from '@/components/common/layout/navbar';
import Footer from '@/components/common/layout/footer';

const BlogPostLayout: LayoutComponent = () => {
  return (
    <section className="w-full text-foreground">
      <div className="fixed top-0 left-0 w-full border-b border-b-border/40 dark:border-b-border bg-background z-30">
        <div className="max-w-[1500px] mx-auto w-full px-4 lg:px-8">
          <Navbar />
        </div>
      </div>

      <main className="w-full pt-[60px]">
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

BlogPostLayout.metadata = {
  openGraph: {
    title: 'Rasengan.js - Blog',
    description: 'Insights, tips, and updates from the Rasengan.js community.',
    url: 'https://rasengan.dev',
    image: 'https://rasengan.dev/assets/images/metadata/blog.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasengan.js - Blog',
    description: 'Insights, tips, and updates from the Rasengan.js community.',
    image: 'https://rasengan.dev/assets/images/metadata/blog.png',
  },
};

export default BlogPostLayout;
