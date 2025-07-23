import { Outlet, LayoutComponent } from 'rasengan';
import { RasenganI18nProvider } from '@rasenganjs/i18n';

const AppLayout: LayoutComponent = () => {
  return (
    <RasenganI18nProvider>
      <Outlet />
    </RasenganI18nProvider>
  );
};

AppLayout.path = '/:locale';

export default AppLayout;
