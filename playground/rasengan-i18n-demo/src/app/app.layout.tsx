import { Outlet, LayoutComponent } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return <Outlet />;
};

AppLayout.path = '/';

export default AppLayout;
