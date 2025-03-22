import { RouterComponent, defineRouter } from 'rasengan';
import DocsLayout from '@/app/docs/docs.layout';
import DocsGroup from './pages/home/home.group';
import PackageGroup from './pages/packages/package.group';

class DocsRouter extends RouterComponent {}

export default defineRouter({
  imports: [],
  layout: DocsLayout,
  pages: [DocsGroup, PackageGroup],
  // useParentLayout: false,
})(DocsRouter);
