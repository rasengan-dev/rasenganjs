import { Controller, type RouteHandler, type Router } from '@rasenganjs/server';
import { UserService } from './user.service';
import z from 'zod';

const UserParamSchema = z.object({
  id: z.coerce.number({ message: 'must be number' }),
});

const UserQuerySchema = z.object({
  page: z.coerce.number({ message: 'must be number' }).optional(),
  limit: z.coerce.number({ message: 'must be number' }).optional(),
});

export class UserController extends Controller {
  schemas = {
    findOne: { params: UserParamSchema, query: UserQuerySchema },
    findAll: { query: UserQuerySchema },
    create: { body: z.object({ name: z.string() }) },
  } as const;

  constructor(private userService: UserService) {
    super();
  }

  routes(router: Router) {
    router.get('/', this.findAll);
    router.get('/:id', this.findOne, this.schemas.findOne);
    router.post('/', this.create, this.schemas.create);
  }

  findAll: RouteHandler = async (ctx) => {
    const list = await this.userService.findAll();
    return ctx.res.json(list);
  };

  findOne: RouteHandler<typeof this.schemas.findOne> = async (ctx) => {
    const user = await this.userService.findById(ctx.params.id);

    if (!user) {
      return ctx.res.status(404).json({ error: 'User not found' });
    }
    return ctx.res.json(user);
  };

  create: RouteHandler<typeof this.schemas.create> = async (ctx) => {
    const user = await this.userService.create(ctx.body);
    return ctx.res.json(user);
  };
}
