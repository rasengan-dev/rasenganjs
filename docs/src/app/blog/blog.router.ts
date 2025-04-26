import { defineRouter, RouterComponent } from 'rasengan';
import RasenganBeta1 from '@/app/blog/pages/rasengan-1-beta.page.mdx';
import RasenganV1Stable from '@/app/blog/pages/rasengan-v1-stable.page.mdx';
import BlogLayout from '@/app/blog/blog.layout';

class BlogRouter extends RouterComponent {}

export default defineRouter({
  layout: BlogLayout,
  pages: [RasenganBeta1, RasenganV1Stable],
})(BlogRouter);
