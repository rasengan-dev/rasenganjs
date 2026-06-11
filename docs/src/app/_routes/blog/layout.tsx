import Footer from '@/components/common/layout/footer';
import Navbar from '@/components/common/layout/navbar';
import { cn } from '@/lib/utils';
import { useBannerStore } from '@/store/banner';
import { LayoutComponent, Outlet } from 'rasengan';

const BlogLayout: LayoutComponent = () => {
  const { show: showBanner } = useBannerStore();

  return (
    <section className="w-full min-h-screen">
      <Navbar
        className={cn(
          'fixed top-0 left-0 right-0 z-30 max-w-[1600px] mx-auto px-4 xl:px-20',
          showBanner && 'top-[60px]'
        )}
      />

      <main className="pt-20 w-full min-h-screen max-w-[1200px] mx-auto docs overflow-y-auto">
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

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
