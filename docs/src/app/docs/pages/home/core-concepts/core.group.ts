import { defineRoutesGroup } from 'rasengan';
import RoutingGroup from './routing/routing.group';

export default defineRoutesGroup({
  path: '/',
  children: [RoutingGroup],
});
