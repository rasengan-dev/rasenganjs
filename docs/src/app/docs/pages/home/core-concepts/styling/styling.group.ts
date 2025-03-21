import { defineRoutesGroup } from 'rasengan';
import CSSModulesPage from './css-modules.page.mdx';
import TailwindCSSPage from './tailwind.page.mdx';
import CSSPreprocessorsPage from './css-processors.page.mdx';

export default defineRoutesGroup({
  path: '/styling',
  children: [CSSModulesPage, TailwindCSSPage, CSSPreprocessorsPage],
});
