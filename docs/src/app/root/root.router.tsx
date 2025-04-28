import { RouterComponent, defineRouter } from 'rasengan';
import RootLayout from '@/app/root/root.layout';
import Home from '@/app/root/pages/home.page';
import Blog from '@/app/root/pages/blog.page';
import Showcase from '@/app/root/pages/showcase.page';
import Learn from '@/app/root/pages/learn.page';

class RootRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: RootLayout,
  pages: [Home, Blog, Showcase, Learn],
})(RootRouter);
