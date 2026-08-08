import { createRequestHandler } from './server/node/index.js';
import { createMatchRoutesGuard } from './server/node/match-routes-guard.js';
import { createApiRouterMiddleware } from './server/node/api-router-middleware.js';
import { resolveBuildOptions } from './server/build/index.js';
import { detectDeploymentPlatform } from './server/runtime/detect-runtime.js';
import { flatApiRoutes } from './routing/utils/flat-api-routes.js';

export * from './server/build/manifest.js';

// `flatApiRoutes` is server-only (RFC-0008) — exported here directly,
// not through `routing/index.ts`'s client-facing barrel, so no _api
// code path can end up in the client bundle.
export { flatApiRoutes };
export type {
  ApiHandler,
  ApiRouteModule,
  ApiMiddlewareModule,
} from './routing/utils/flat-api-routes.js';

// `rasengan/server` re-exports the full `@rasenganjs/futon` API surface —
// app code (including file-based `_api` route handlers) imports Futon's
// primitives (`json`, `Context`, `Router`, middleware, ...) from here
// instead of depending on `@rasenganjs/futon` directly.
//
// `toExpressHandler`/`toWinterCgHandler` are deliberately excluded (RFC-0007
// §2) — import them from `@rasenganjs/futon` directly if needed. `export *`
// can't exclude individual names, so this list is a manual mirror of
// futon's own `src/index.ts`, kept in sync by hand minus those two.
export {
  Futon,
  createContext,
  compose,
  basicAuth,
  bearerToken,
  bodyParser,
  cors,
  logger,
  requestId,
  compress,
  staticFiles,
  bodyLimit,
  fileUpload,
  MemoryStorage,
  UPLOAD_ERROR_CODES,
  Router,
  RasenganTreeRouter,
  matchPath,
  parseQueryString,
  ResponseBuilder,
  json,
  text,
  html,
  redirect,
  status,
  notFound,
  streamResponse,
  nodeStreamToResponse,
  setCookie,
  clearCookie,
  serializeCookie,
  getPathname,
  getQueryParams,
  getQueryParam,
  parseJson,
  parseUrlEncoded,
  parseFormData,
  parseText,
  parseBody,
  parseCookies,
  getCookie,
  HookSystem,
  HttpError,
  NotFoundError,
  MethodNotAllowedError,
  InternalServerError,
} from '@rasenganjs/futon';
export type {
  Context,
  RuntimeContext,
  QueryParams,
  ServerInfo,
  Assets,
  Middleware,
  BasicAuthOptions,
  BearerTokenOptions,
  BodyParserOptions,
  CORSOptions,
  LoggerOptions,
  LogEntry,
  RequestIdOptions,
  CompressOptions,
  StaticOptions,
  BodyLimitOptions,
  FieldSpec,
  FileFilter,
  FileInfo,
  StorageEngine,
  UploadErrorCode,
  UploadLimits,
  UploadOptions,
  UploadedFile,
  Uploader,
  HTTPMethod,
  RouterGroupOptions,
  TreeMatchResult,
  CookieOptions,
  HookName,
  HookHandler,
  FetchHandler,
} from '@rasenganjs/futon';

export {
  createRequestHandler,
  createMatchRoutesGuard,
  createApiRouterMiddleware,
  resolveBuildOptions,
  detectDeploymentPlatform,
};
