import { CustomLink, ScrollRestoration } from './components/index.js';

export type {
  Metadata,
  MetadataWithoutTitleAndDescription,
  LayoutComponent,
  PageComponent,
  MDXPageComponent,
  LoaderOptions,
  LoaderResponse,
  ReactComponentProps,
  TemplateProps,
} from './types.js';
export { defineRouter, defineRoutesGroup, flatRoutes } from './utils/index.js';
export { RouterComponent } from './interfaces.js';
export {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
  useFetcher,
  useMatch,
  useRoutes,
  useResolvedPath,
  matchRoutes,
  generatePath,
  matchPath,
  createRoutesFromChildren,
  Navigate,
  NavLink,
} from 'react-router';
export { CustomLink as Link, ScrollRestoration };
