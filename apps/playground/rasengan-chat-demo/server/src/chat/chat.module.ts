import { defineModule } from '@rasenganjs/server';
import { ChatGateway } from './chat.gateway.js';
import { ChatService } from './chat.service.js';
import { FilesController } from './files.controller.js';

export default defineModule({
  name: 'ChatModule',
  // Gateway extends Provider, and createWsPlugin() implements
  // ModulePlugin.asProviders() — ChatGateway is registered, eagerly
  // resolved, and exportable from `gateways:` alone.
  gateways: [ChatGateway],
  providers: [ChatService],
  controllers: [FilesController],
  exports: [ChatService],
});
