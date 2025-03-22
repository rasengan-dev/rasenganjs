import { defineRoutesGroup } from 'rasengan';
import SSRPage from './ssr.page.mdx';
import CSRPage from './csr.page.mdx';
import PrerenderingPage from './prerendering.page.mdx';

export default defineRoutesGroup({
  path: '/rendering',
  children: [SSRPage, CSRPage, PrerenderingPage],
});
