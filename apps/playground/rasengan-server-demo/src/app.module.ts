import { defineModule } from '@rasenganjs/server';
import UserModule from './user.module';
import ChatRoomModule from './chat-room.module';
import { PingController } from './ping.controller';

export default defineModule({
  imports: [UserModule, ChatRoomModule],
  controllers: [PingController],
});
