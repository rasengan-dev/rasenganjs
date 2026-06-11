import { Outlet, LayoutComponent } from 'rasengan';
import { RasenganI18nProvider } from '@rasenganjs/i18n';
import i18n from 'virtual:rasengan/i18n';

const AppLayout: LayoutComponent = () => {
  return (
    <RasenganI18nProvider i18n={i18n}>
      <Outlet />
    </RasenganI18nProvider>
  );
};

AppLayout.path = '/:locale';

export default AppLayout;
