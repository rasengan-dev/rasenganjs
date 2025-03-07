import { defineRoutesGroup } from 'rasengan';
import GettingStartedGroup from './getting-started/getting-started.group';

export default defineRoutesGroup({
  path: '/',
  children: [GettingStartedGroup],
});
