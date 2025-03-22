import { defineRoutesGroup } from 'rasengan';
import ImagesPage from './image.page.mdx';
import MetadataPage from './metadata.page.mdx';
import StaticAssetsPage from './static-assets.page.mdx';

export default defineRoutesGroup({
  path: '/optimizing',
  children: [ImagesPage, MetadataPage, StaticAssetsPage],
});
