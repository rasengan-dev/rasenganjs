import { defineRoutesGroup } from 'rasengan';
import RoutingGroup from './routing/routing.group';
import StylingGroup from './styling/styling.group';
import OptimizingGroup from './optimizing/optimizing.group';
import ConfigGroup from './configuring/config.group';
import DeployingGroup from './deploying/deploying.group';

export default defineRoutesGroup({
  path: '/',
  children: [
    RoutingGroup,
    StylingGroup,
    OptimizingGroup,
    ConfigGroup,
    DeployingGroup,
  ],
});
