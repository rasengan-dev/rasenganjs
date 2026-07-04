import { Controller, type RouteHandler, type Router } from '@rasenganjs/server';

export class HelloController extends Controller {
  routes(router: Router) {
    router.get('/', this.world);
    router.get('/hello/:name', this.greet);
  }

  world: RouteHandler = async (ctx) => {
    return ctx.res.json({ message: 'Hello from workerd runtime!' });
  };

  greet: RouteHandler = async (ctx) => {
    return ctx.res.json({ message: `Hello, ${ctx.params.name}` });
  };
}
