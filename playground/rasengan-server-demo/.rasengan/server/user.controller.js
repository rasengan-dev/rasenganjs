class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  routes(router) {
    router.get('/', this.findAll);
    router.get('/:id', this.findOne);
  }
  findAll = async (ctx) => {
    const list = await this.userService.findAll();
    return ctx.json(list);
  };
  findOne = async (ctx) => {
    const user = await this.userService.findById(ctx.params.id);
    return ctx.json(user);
  };
}
export { UserController };
