import { defineRouter, RouterComponent } from 'rasengan';
import RasenganBeta1 from '@/app/blog/pages/rasengan-1-beta.page.mdx';
import RasenganV1Stable from '@/app/blog/pages/rasengan-v1-stable.page.mdx';
import RasenganV110 from '@/app/blog/pages/rasengan-v1-1-0.page.mdx';
import RasenganV113 from '@/app/blog/pages/rasengan-v1-1-3.page.mdx';
import BlogLayout from '@/app/blog/blog.layout';

class BlogRouter extends RouterComponent {}

export default defineRouter({
  layout: BlogLayout,
  pages: [RasenganBeta1, RasenganV1Stable, RasenganV110, RasenganV113],
})(BlogRouter);
