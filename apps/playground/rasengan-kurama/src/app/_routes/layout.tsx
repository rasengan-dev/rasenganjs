import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';

const RootLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default RootLayout;
