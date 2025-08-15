import { defineRoutesGroup } from 'rasengan';
import ImagePage from './image.page.mdx';
import CreateRasenganPage from './create-rasengan.page.mdx';
import KuramaPage from './kurama.page.mdx';
import MDXPage from './mdx.page.mdx';
import ThemePage from './theme.page.mdx';
import ServePage from './serve.page.mdx';
import VercelPage from './vercel.page.mdx';
import I18NPage from './i18n.page.mdx';

export default defineRoutesGroup({
  path: '/',
  children: [
    ImagePage,
    CreateRasenganPage,
    KuramaPage,
    MDXPage,
    ThemePage,
    ServePage,
    VercelPage,
    I18NPage,
  ],
});
