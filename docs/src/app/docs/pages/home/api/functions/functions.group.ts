import { defineRoutesGroup } from 'rasengan';
import DefineConfigPage from './define-config.page.mdx';
import DefineRoutesGroupPage from './define-routes-group.page.mdx';
import DefineRouterPage from './define-router.page.mdx';
import renderAppPage from './render-app.page.mdx';

export default defineRoutesGroup({
  path: '/functions',
  children: [
    DefineConfigPage,
    DefineRoutesGroupPage,
    DefineRouterPage,
    renderAppPage,
  ],
});
