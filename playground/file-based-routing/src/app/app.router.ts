import { RouterComponent, defineRouter } from 'rasengan';
import Router from 'virtual:rasengan/router';

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [Router],
  pages: [],
})(AppRouter);
