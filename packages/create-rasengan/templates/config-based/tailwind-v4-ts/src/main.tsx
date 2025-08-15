import '@rasenganjs/image/css';
import '@/styles/index.css';
import { type AppProps } from 'rasengan';
import AppRouter from '@/app/app.router';

export default function App({ Component, children }: AppProps) {
  return <Component router={AppRouter}>{children}</Component>;
}
