import { Controller } from '@rasenganjs/server';
import z from 'zod';
const UserParamSchema = z.object({
  id: z.coerce.number({ message: 'must be number' }),
});
const UserQuerySchema = z.object({
  page: z.coerce.number({ message: 'must be number' }).optional(),
  limit: z.coerce.number({ message: 'must be number' }).optional(),
});
class UserController extends Controller {
  constructor(userService) {
    super();
    this.userService = userService;
  }
  schemas = {
    findOne: { params: UserParamSchema, query: UserQuerySchema },
    findAll: { query: UserQuerySchema },
    create: { body: z.object({ name: z.string() }) },
  };
  routes(router) {
    router.get('/', this.findAll);
    router.get('/:id', this.findOne, this.schemas.findOne);
    router.post('/', this.create, this.schemas.create);
  }
  findAll = async (ctx) => {
    const list = await this.userService.findAll();
    return ctx.res.json(list);
  };
  findOne = async (ctx) => {
    const user = await this.userService.findById(ctx.params.id);
    if (!user) {
      return ctx.res.status(404).json({ error: 'User not found' });
    }
    return ctx.res.json(user);
  };
  create = async (ctx) => {
    const user = await this.userService.create(ctx.body);
    return ctx.res.json(user);
  };
}
export { UserController };
