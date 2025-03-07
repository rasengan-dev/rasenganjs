import { RouterComponent, defineRouter } from 'rasengan';
import Home from '@/app/root/pages/home.page';
import RootLayout from '@/app/root/root.layout';

class RootRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: RootLayout,
  pages: [Home],
})(RootRouter);
