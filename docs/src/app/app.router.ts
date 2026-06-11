import { RouterComponent, defineRouter } from 'rasengan';
import NotFound from './_404';
import Router from 'virtual:rasengan/router';

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [Router],
  notFoundComponent: NotFound,
})(AppRouter);
