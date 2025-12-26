import { Outlet, LayoutComponent } from 'rasengan';
import Navbar from '@/components/common/layout/navbar';
import Footer from '@/components/common/layout/footer';
import { useBannerStore } from '@/store/banner';
import { twMerge } from 'tailwind-merge';

const Layout: LayoutComponent = () => {
  const { show: showBanner } = useBannerStore();

  return (
    <section
      className={twMerge(
        'w-screen min-h-screen overflow-y-auto',
        showBanner ? 'pt-[60px]' : 'pt-[0px]'
      )}
    >
      <Navbar className="max-w-[1600px] mx-auto px-4 xl:px-20" />

      <main className="max-w-[1600px] mx-auto">
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

export default Layout;
