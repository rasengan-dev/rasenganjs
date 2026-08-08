import { type AppProps } from 'rasengan';
import { RasenganIOProvider } from '@rasenganjs/io';

export default function App({ Component, children }: AppProps) {
  return (
    <RasenganIOProvider url="ws://localhost:4000/lobby" autoConnect={true}>
      <Component>{children}</Component>
    </RasenganIOProvider>
  );
}
