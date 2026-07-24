import { defineModule } from '@rasenganjs/server';
import { HelloQueue } from './hello.queue';
import { QueueController } from './queue.controller';

export default defineModule({
  queues: [HelloQueue],
  controllers: [QueueController],
});
