import { defineRouter, RouterComponent } from 'rasengan';
import About from '@/app/sub-router/about.page';

class SubRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  pages: [About],
})(SubRouter);
