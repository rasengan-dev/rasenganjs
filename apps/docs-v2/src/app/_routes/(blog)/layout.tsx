import { Outlet, LayoutComponent } from 'rasengan';
import Navbar from '@/components/common/layout/navbar';
import Footer from '@/components/common/layout/footer';

const BlogLayout: LayoutComponent = () => {
  return (
    <section className="w-full text-foreground">
      <div className="fixed top-0 left-0 w-full border-b border-b-border/40 dark:border-b-border bg-background z-30">
        <div className="max-w-[1500px] mx-auto w-full px-4 lg:px-8">
          <Navbar />
        </div>
      </div>

      <main className="w-full pt-[60px]">
        <div className="max-w-[1500px] mx-auto w-full px-4 lg:px-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default BlogLayout;
