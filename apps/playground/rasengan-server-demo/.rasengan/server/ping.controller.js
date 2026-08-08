import { Controller } from '@rasenganjs/server';
class PingController extends Controller {
  routes(router) {
    router.get('/ping', this.ping);
    router.get('/ping2', this.ping2);
  }
  ping = async (ctx) => {
    return ctx.res.json({ ok: true });
  };
  ping2 = async (ctx) => {
    return ctx.res.json({ ok: true, message: 'pong2' });
  };
}
export { PingController };
