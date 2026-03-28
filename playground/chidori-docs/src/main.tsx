import '@rasenganjs/image/css';
import '@/styles/index.css';
import '@/styles/global.css';
import { type AppProps } from 'rasengan';
import ThemeProvider from '@rasenganjs/theme';

export default function App({ Component, children }: AppProps) {
  return (
    <ThemeProvider>
      <Component>{children}</Component>
    </ThemeProvider>
  );
}
