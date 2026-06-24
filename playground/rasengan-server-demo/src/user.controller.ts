import { Controller, type RouteHandler, type Router } from '@rasenganjs/server';
import { UserService } from './user.service';

export class UserController extends Controller {
  constructor(private userService: UserService) {
    super();
  }

  routes(router: Router) {
    router.get('/', this.findAll);
    // router.get('/:id', this.findOne);
  }

  findAll: RouteHandler = async (ctx) => {
    const list = await this.userService.findAll();
    return ctx.json(list);
  };

  findOne: RouteHandler = async (ctx) => {
    const user = await this.userService.findById(ctx.params.id);
    return ctx.json(user);
  };
}
