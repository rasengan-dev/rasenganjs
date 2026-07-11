import { defineModule } from '@rasenganjs/server';
import { ChatGateway } from './chat.gateway.js';
import { ChatService } from './chat.service.js';

export default defineModule({
  gateways: [ChatGateway],
  providers: [ChatService],
});
