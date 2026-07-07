import { ServerApp } from '@rasenganjs/server';
import appModule from './app.module';

export default function configureApp(app: ServerApp) {
  app.registerModule(appModule);

  return app;
}
