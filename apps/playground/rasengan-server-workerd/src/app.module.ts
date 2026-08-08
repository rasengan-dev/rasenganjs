import { defineModule } from '@rasenganjs/server';
import { HelloController } from './app/hello.controller';

export default defineModule({
  providers: [],
  controllers: [HelloController],
});
