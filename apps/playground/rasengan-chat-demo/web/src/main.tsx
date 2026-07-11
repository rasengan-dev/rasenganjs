import '@/styles/index.css';
import { type AppProps } from 'rasengan';
import { RasenganIOProvider } from '@rasenganjs/io';

const WS_URL =
  (import.meta.env.RASENGAN_CHAT_WS_URL as string | undefined) ??
  'ws://localhost:3007/chat';

export default function App({ Component, children }: AppProps) {
  return (
    <RasenganIOProvider
      url={WS_URL}
      options={{ reconnectionDelay: 1000, reconnectionDelayMax: 5000 }}
    >
      <Component>{children}</Component>
    </RasenganIOProvider>
  );
}
