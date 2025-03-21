import { defineRoutesGroup } from 'rasengan';
import NodeServerPage from './node.page.mdx';
import VercelPage from './vercel.page.mdx';

export default defineRoutesGroup({
  path: '/deploying',
  children: [NodeServerPage, VercelPage],
});
