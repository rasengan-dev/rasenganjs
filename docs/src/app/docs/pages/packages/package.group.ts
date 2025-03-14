import { defineRoutesGroup } from 'rasengan';
import IntroductionPage from './introduction.page.mdx';
import ModulesGroup from './module/modules.group';

export default defineRoutesGroup({
  path: '/packages',
  children: [IntroductionPage, ModulesGroup],
});
