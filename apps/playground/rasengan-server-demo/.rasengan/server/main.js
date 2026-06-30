import { bootstrap } from '@rasenganjs/server';
import appModule from './app.module.js';
import { zodAdapter } from '@rasenganjs/validation';
bootstrap(async (app) => {
  app.registerModule(appModule);
  app.configureValidation({
    adapter: zodAdapter,
  });
  app.notFound(async (ctx) => {
    return ctx.response.status(404).json({ message: 'Not Found' });
  });
});
