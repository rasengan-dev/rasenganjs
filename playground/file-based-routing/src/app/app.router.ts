import { RouterComponent, defineRouter, flatRoutes } from 'rasengan';

const Router = flatRoutes();

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [Router],
  pages: [],
})(AppRouter);
