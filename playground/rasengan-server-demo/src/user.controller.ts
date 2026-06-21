import {
  Controller,
  type RouteHandler,
  type ServerRouter,
} from '@rasenganjs/server';
import { UserService } from './user.service.js';

export class UserController extends Controller {
  constructor(
    private userService: UserService,
    private CONFIG: { port: number }
  ) {
    super();
  }

  routes(router: ServerRouter) {
    router.get('/', this.findAll);
    router.get('/:id', this.findOne);
  }

  findAll: RouteHandler = async (ctx) => {
    const list = await this.userService.findAll();
    console.log(this.CONFIG);
    return ctx.json(list);
  };

  findOne: RouteHandler = async (ctx) => {
    const user = await this.userService.findById(ctx.params.id);
    return ctx.json(user);
  };
}
