import {
  Controller,
  type RouteHandler,
  type ServerRouter,
} from '@rasenganjs/server';

export class PingController extends Controller {
  routes(router: ServerRouter) {
    router.get('/ping', this.ping);
  }

  ping: RouteHandler = async (ctx) => {
    return ctx.json({ ok: true });
  };
}
