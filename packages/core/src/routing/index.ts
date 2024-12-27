import { CustomLink } from "./components/index.js";

export type { Metadata } from "./types.js";
export { defineRouter, defineRoutesGroup } from "./utils/index.js";
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
} from "react-router";
export { CustomLink as Link };
