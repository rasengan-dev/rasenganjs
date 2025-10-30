import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { useBannerStore } from '@/store/banner';
import { twMerge } from 'tailwind-merge';

const AppLayout: LayoutComponent = () => {
  const { show: showBanner } = useBannerStore();

  return (
    <section
      className={twMerge(
        'w-screen min-h-screen overflow-y-auto',
        showBanner ? 'pt-[60px]' : 'pt-[0px]'
      )}
    >
      <Navbar className="max-w-[1600px] px-4 xl:px-20" />

      <main className="max-w-[1600px] mx-auto">
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
