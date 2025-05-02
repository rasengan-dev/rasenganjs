import React from 'react';
import { Outlet } from 'rasengan';

export default function AppLayout() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
