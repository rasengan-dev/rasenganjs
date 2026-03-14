import '@rasenganjs/image/css';
import '@/styles/index.css';
import { type AppProps } from 'rasengan';
// @ts-ignore
import config from 'virtual:rasengan/mdx-components';
import ThemeProvider from '@rasenganjs/theme';

export default function App({ Component, children }: AppProps) {
  return (
    <ThemeProvider>
      <Component>{children}</Component>
    </ThemeProvider>
  );
}
