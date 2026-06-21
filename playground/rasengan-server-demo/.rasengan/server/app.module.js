import { defineModule } from '@rasenganjs/server';
import UserModule from './user.module.js';
import { PingController } from './ping.controller.js';
var app_module_default = defineModule({
  imports: [UserModule],
  controllers: [PingController],
});
export { app_module_default as default };
