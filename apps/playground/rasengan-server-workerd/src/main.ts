import { bootstrap } from '@rasenganjs/server';
import appModule from './app.module';

bootstrap((app) => {
  app.registerModule(appModule);
});
