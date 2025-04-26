import { RouterComponent, defineRouter } from 'rasengan';
import RootRouter from '@/app/root/root.router';
import AppLayout from '@/app/app.layout';
import DocsRouter from '@/app/docs/docs.router';
import NotFound from './_404';
import BlogRouter from '@/app/blog/blog.router';

class AppRouter extends RouterComponent {}

export default defineRouter({
  imports: [RootRouter, DocsRouter, BlogRouter],
  layout: AppLayout,
  pages: [],
  notFoundComponent: NotFound,
})(AppRouter);
