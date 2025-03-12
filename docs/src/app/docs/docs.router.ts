import { RouterComponent, defineRouter } from 'rasengan';
import DocsLayout from '@/app/docs/docs.layout';
import HomeGroup from './pages/home/home.group';

class DocsRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: DocsLayout,
  pages: [HomeGroup],
})(DocsRouter);
