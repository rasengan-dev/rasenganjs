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

  app.onInit(() => {
    console.log('App initialized');
  });

  app.onDestroy(() => {
    console.log('App destroyed');
  });
});
