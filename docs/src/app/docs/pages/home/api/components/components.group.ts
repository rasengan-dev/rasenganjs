import { defineRoutesGroup } from 'rasengan';
import LinkPage from './link.page.mdx';
import OutletPage from './outlet.page.mdx';
import ComponentPage from './component.page.mdx';
import LayoutComponentPage from './layout-component.page.mdx';
import PageComponentPage from './page-component.page.mdx';
import RouterComponentPage from './router-component.page.mdx';
import TemplatePage from './template.page.mdx';

export default defineRoutesGroup({
  path: '/components',
  children: [
    LinkPage,
    OutletPage,
    ComponentPage,
    LayoutComponentPage,
    PageComponentPage,
    RouterComponentPage,
    TemplatePage,
  ],
});
