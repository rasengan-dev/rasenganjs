import { RouterComponent, defineRouter, flatRoutes } from 'rasengan';
import AppLayout from '@/app/app.layout';
import Blog from '@/app/blog.page.mdx';
import SubRouter from '@/app/sub-router/sub-router.router';

const router = flatRoutes();

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [SubRouter, router],
  // layout: AppLayout,
  pages: [Blog],
})(AppRouter);
