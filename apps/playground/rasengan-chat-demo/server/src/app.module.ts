import { defineModule } from '@rasenganjs/server';
import chatModule from './chat/chat.module.js';

export default defineModule({
  imports: [chatModule],
});
