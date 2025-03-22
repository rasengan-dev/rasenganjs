import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="w-full h-screen overflow-auto">
      <Navbar />

      <Outlet />

      <Footer />
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
