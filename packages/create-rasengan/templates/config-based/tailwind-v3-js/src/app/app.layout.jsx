import React from 'react';
import { Outlet } from 'rasengan';

const AppLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

AppLayout.path = '/';

export default AppLayout;
