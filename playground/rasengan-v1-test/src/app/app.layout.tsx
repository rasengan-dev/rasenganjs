import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="w-full bg-white">
      <main className="w-full max-w-[1000px] mx-auto p-4">
        <Outlet />
      </main>
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
