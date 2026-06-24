import { Controller, type RouteHandler, type Router } from '@rasenganjs/server';

export class PingController extends Controller {
  routes(router: Router) {
    router.get('/ping', this.ping);
    router.get('/ping2', this.ping2);
  }

  ping: RouteHandler = async (ctx) => {
    return ctx.res.json({ ok: true });
  };

  ping2: RouteHandler = async (ctx) => {
    return ctx.res.json({ ok: true, message: 'pong2' });
  };
}
