import { Outlet, LayoutComponent } from 'rasengan';

const AppLayout: LayoutComponent = () => {
  return <Outlet />;
};

AppLayout.path = '/:locale';

export default AppLayout;
