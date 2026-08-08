import { bootstrap } from '@rasenganjs/server';
import configureApp from './index';

bootstrap((app) => {
  configureApp(app);
});
