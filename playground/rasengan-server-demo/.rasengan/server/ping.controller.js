class PingController {
  routes(router) {
    router.get('/ping', this.ping);
  }
  ping = async (ctx) => {
    return ctx.json({ ok: true });
  };
}
export { PingController };
