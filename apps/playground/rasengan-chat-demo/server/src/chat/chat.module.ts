import { defineModule } from '@rasenganjs/server';
import { ChatGateway } from './chat.gateway.js';
import { ChatService } from './chat.service.js';
import { FilesController } from './files.controller.js';

export default defineModule({
  name: 'ChatModule',
  gateways: [ChatGateway],
  // A gateway must ALSO be a provider to be exportable — `gateways:` is
  // opaque to core (ModulePlugin key), `providers:` is what DI validates.
  providers: [ChatService, ChatGateway],
  controllers: [FilesController],
  exports: [ChatService],
});
