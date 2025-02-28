import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return (
    <section className="w-full bg-white font-comfortaa">
      <main className="w-full p-4">
        <Outlet />
      </main>
    </section>
  );
};

AppLayout.path = '/';

export default AppLayout;
