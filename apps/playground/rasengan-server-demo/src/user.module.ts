import { defineModule } from '@rasenganjs/server';
import { UserController } from './user.controller';
import { UserService } from './user.service';

export default defineModule({
  prefix: '/users',
  controllers: [UserController],
  providers: [
    {
      provide: UserController,
      deps: [UserService, 'CONFIG'],
    },
    {
      provide: 'CONFIG',
      useValue: {
        port: 3000,
      },
    },
  ],
});
