import { defineModule } from '@rasenganjs/server';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
var user_module_default = defineModule({
  prefix: '/users',
  controllers: [UserController],
  providers: [UserService],
});
export { user_module_default as default };
