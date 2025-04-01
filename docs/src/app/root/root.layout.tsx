import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="w-full h-screen overflow-auto">
      <Navbar className="max-w-[1500px] left-1/2 -translate-x-1/2" />

      <main className="max-w-[1600px] mx-auto">
        <Outlet />
      </main>

      <Footer />
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
