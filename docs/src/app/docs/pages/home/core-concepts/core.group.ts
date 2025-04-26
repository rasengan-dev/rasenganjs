import { defineRoutesGroup } from 'rasengan';
import RoutingGroup from './routing/routing.group';
import StylingGroup from './styling/styling.group';
import OptimizingGroup from './optimizing/optimizing.group';
import ConfigGroup from './configuring/config.group';
import DeployingGroup from './deploying/deploying.group';
import RenderingGroup from './rendering/rendering.group';
import ApiGroup from '../api/api.group';

export default defineRoutesGroup({
  path: '/',
  children: [
    RoutingGroup,
    RenderingGroup,
    StylingGroup,
    OptimizingGroup,
    ConfigGroup,
    DeployingGroup,
    ApiGroup,
  ],
});
