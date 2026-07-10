import { bootstrap } from '@rasenganjs/server';
import appModule from './app.module';
import { zodAdapter } from '@rasenganjs/validators';

bootstrap(async (app) => {
  app.registerModule(appModule);

  app.configureValidation({
    adapter: zodAdapter,
  });

  app.notFound(async (ctx) => {
    return ctx.response.status(404).json({ message: 'Not Found' });
  });

  // RFC-0001 core abstraction + Node adapter smoke test: a simple echo
  // room at /chat. Connect with a WebSocket client (see
  // scripts/ws-client.mjs) while running `pnpm dev` under Node.
  app.websocket('/chat', {
    open(ctx) {
      console.log('[ws] client connected:', ctx.request.url);
    },
    message(ctx, data) {
      console.log('[ws] received:', data);
      ctx.socket.send(`echo: ${data}`);
    },
    close(_ctx, code, reason) {
      console.log('[ws] client disconnected:', code, reason);
    },
    error(_ctx, error) {
      console.error('[ws] connection error:', error);
    },
  });

  // Lifecycle hooks
  app.onInit(() => {
    console.log('App initialized');
  });

  app.onDestroy(() => {
    console.log('App destroyed');
  });
});
