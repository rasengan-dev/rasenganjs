import '@rasenganjs/image/css';
import '@/styles/index.css';
import { type AppProps } from 'rasengan';
import AppRouter from '@/app/app.router';
import { RasenganI18nProvider } from '@rasenganjs/i18n';

export default function App({ Component, children }: AppProps) {
  return (
    <RasenganI18nProvider>
      <Component router={AppRouter}>{children}</Component>
    </RasenganI18nProvider>
  );
}
