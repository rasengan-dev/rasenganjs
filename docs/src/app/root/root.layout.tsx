import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="w-screen min-h-screen overflow-y-auto">
      <Navbar className="max-w-[1600px] left-1/2 -translate-x-1/2 px-4 xl:px-20" />

      <main className="max-w-[1600px] mx-auto">
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
