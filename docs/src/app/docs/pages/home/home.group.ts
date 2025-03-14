import { defineRoutesGroup } from 'rasengan';
import GettingStartedGroup from './getting-started/getting-started.group';
import CoreGroup from './core-concepts/core.group';

export default defineRoutesGroup({
  path: '/docs',
  children: [GettingStartedGroup, CoreGroup],
});
