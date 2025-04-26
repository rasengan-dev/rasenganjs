import '@rasenganjs/image/css';
import '@rasenganjs/mdx/css';
import '@/styles/index.css';
import '@/styles/mdx.scss';
import { type AppProps } from 'rasengan';
import AppRouter from '@/app/app.router';
import ThemeProvider from '@rasenganjs/theme';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, children }: AppProps) {
  return (
    <ThemeProvider>
      <Component router={AppRouter}>{children}</Component>

      <Analytics />
    </ThemeProvider>
  );
}
