import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';
import Navbar from '@/components/layout/navbar';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="w-full h-full overflow-auto">
      <Navbar />

      <Outlet />
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
