import { type AppProps } from 'rasengan';
import { RasenganIOProvider } from '@rasenganjs/io';

export default function App({ Component, children }: AppProps) {
  return (
    <RasenganIOProvider url="http://localhost:4000" autoConnect={true}>
      <Component>{children}</Component>
    </RasenganIOProvider>
  );
}
