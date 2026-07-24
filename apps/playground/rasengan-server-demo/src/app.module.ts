import { defineModule } from '@rasenganjs/server';
import UserModule from './user.module';
import ChatRoomModule from './chat-room.module';
import QueueModule from './queue.module';
import { PingController } from './ping.controller';
import { UploadController } from './upload.controller';

export default defineModule({
  imports: [UserModule, ChatRoomModule, QueueModule],
  controllers: [PingController, UploadController],
});
