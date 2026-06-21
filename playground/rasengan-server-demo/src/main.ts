import { bootstrap } from '@rasenganjs/server';
import appModule from './app.module';

const port = Number(process.env.RASENGAN_SERVER_PORT) || 3000;
const host = process.env.RASENGAN_SERVER_HOST || '0.0.0.0';

bootstrap(
  async (app) => {
    app.registerModule(appModule);
  },
  { port, host }
);
