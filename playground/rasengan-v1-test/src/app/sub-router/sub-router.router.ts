import { defineRouter, RouterComponent } from 'rasengan';
import { About } from '@/app/sub-router/about.page';
import Group1 from './group/index.group';

class SubRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  pages: [About, Group1],
  // useParentLayout: false
})(SubRouter);
