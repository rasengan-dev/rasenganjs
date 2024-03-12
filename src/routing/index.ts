import { CustomLink } from "./components/index.js";

export {
  defineRouteLayout,
  defineRoutePage,
  defineRouter,
} from "./utils/index.js";
export { RouterComponent } from "./interfaces.js";
export {
  Outlet,
  useLocation,
  useNavigate,
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
} from "react-router-dom";
export { CustomLink as Link };
