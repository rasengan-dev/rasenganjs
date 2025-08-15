import React from 'react';
import { Outlet, LayoutComponent } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

AppLayout.path = '/';

export default AppLayout;
