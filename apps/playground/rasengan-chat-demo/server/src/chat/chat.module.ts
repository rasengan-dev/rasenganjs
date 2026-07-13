import { defineModule } from '@rasenganjs/server';
import { ChatGateway } from './chat.gateway.js';
import { ChatService } from './chat.service.js';
import { FilesController } from './files.controller.js';

export default defineModule({
  gateways: [ChatGateway],
  providers: [ChatService],
  controllers: [FilesController],
});
