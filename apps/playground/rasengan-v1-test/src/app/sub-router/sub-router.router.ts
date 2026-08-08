import { defineRouter, RouterComponent } from 'rasengan';
import { About } from '@/app/sub-router/about.page';
import Group1 from './group/index.group';
import Home from './home.page';

class SubRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  pages: [Home, About, Group1],
  useParentLayout: true,
})(SubRouter);
