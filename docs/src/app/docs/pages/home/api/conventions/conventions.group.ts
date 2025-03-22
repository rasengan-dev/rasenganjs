import { defineRoutesGroup } from 'rasengan';
import LayoutPage from './layout.page.mdx';
import PageConventionPage from './page.page.mdx';
import RouterConventionPage from './router.page.mdx';

export default defineRoutesGroup({
  path: '/conventions',
  children: [LayoutPage, PageConventionPage, RouterConventionPage],
});
