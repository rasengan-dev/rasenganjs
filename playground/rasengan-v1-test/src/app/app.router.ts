import { RouterComponent, defineRouter } from 'rasengan';
import AppLayout from '@/app/app.layout';
import Home from '@/app/home.page';
import Blog from '@/app/blog.page.mdx';
import SubRouter from '@/app/sub-router/sub-router.router';

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [SubRouter],
  layout: AppLayout,
  pages: [Home, Blog],
})(AppRouter);
