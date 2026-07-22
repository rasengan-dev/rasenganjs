import { defineModule } from '@rasenganjs/server';
import { ChatGateway } from './chat.gateway.js';
import { ChatService } from './chat.service.js';
import { FilesController } from './files.controller.js';
import { MediaQueue } from './media.queue.js';

export default defineModule({
  name: 'ChatModule',
  // Gateway/Queue both extend Provider, and their plugins implement
  // ModulePlugin.asProviders() — both are registered, eagerly resolved,
  // and exportable from `gateways:`/`queues:` alone. MediaQueue injects
  // ChatGateway directly (same module — no `exports` needed for that).
  gateways: [ChatGateway],
  queues: [MediaQueue],
  providers: [ChatService],
  controllers: [FilesController],
  exports: [ChatService],
});
