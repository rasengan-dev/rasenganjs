import React from 'react';
import { Outlet } from 'rasengan';

const RootLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default RootLayout;
