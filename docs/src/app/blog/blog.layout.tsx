import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { LayoutComponent, Outlet } from 'rasengan';

const BlogLayout: LayoutComponent = () => {
  return (
    <section className="w-full min-h-screen">
      <Navbar />

      <main className="pt-20 w-full min-h-screen max-w-[1200px] mx-auto docs">
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

BlogLayout.path = '/blog';
BlogLayout.metadata = {
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

export default BlogLayout;
