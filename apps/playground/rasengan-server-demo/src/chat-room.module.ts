import { defineModule } from '@rasenganjs/server';
import { ChatRoomGateway } from './chat-room.gateway';
import { ChatRoomService } from './chat-room.service';

export default defineModule({
  gateways: [ChatRoomGateway],
  providers: [ChatRoomService],
});
