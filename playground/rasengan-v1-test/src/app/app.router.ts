import { RouterComponent, defineRouter } from 'rasengan';
import AppLayout from '@/app/app.layout';
import Blog from '@/app/blog.page.mdx';
import SubRouter from '@/app/sub-router/sub-router.router';
import mdxConfig from '@/component.mdx';

console.log({ mdxConfig });

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [SubRouter],
  layout: AppLayout,
  pages: [Blog],
})(AppRouter);
