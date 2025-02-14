import { RouterComponent, defineRouter } from 'rasengan';
import AppLayout from '@/app/app.layout';
import Home from '@/app/home.page';
import Blog from '@/app/blog.page.mdx';

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: AppLayout,
  pages: [Home, Blog],
})(AppRouter);
