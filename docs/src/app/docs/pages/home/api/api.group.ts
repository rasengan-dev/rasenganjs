import { defineRoutesGroup } from 'rasengan';
import componentsGroup from './components/components.group';
import functionsGroup from './functions/functions.group';
import conventionsGroup from './conventions/conventions.group';
import RasenganConfigPage from './rasengan-config.page.mdx';
import CreateRasenganCliPage from './create-rasengan-cli.page.mdx';
import RasenganCliPage from './rasengan-cli.page.mdx';

export default defineRoutesGroup({
  path: '/api-reference',
  children: [
    componentsGroup,
    functionsGroup,
    conventionsGroup,
    RasenganConfigPage,
    CreateRasenganCliPage,
    RasenganCliPage,
  ],
});
