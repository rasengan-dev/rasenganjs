import { defineModule } from '@rasenganjs/server';
import UserModule from './user.module';
import { PingController } from './ping.controller';

export default defineModule({
  imports: [UserModule],
  controllers: [PingController],
});
