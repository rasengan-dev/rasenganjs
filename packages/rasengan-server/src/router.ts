import type {
  Context,
  Middleware,
  Router as RuntimeRouter,
} from '@rasenganjs/runtime';

export class Router {
  constructor(private router: RuntimeRouter) {}

  get(path: string, handler: RouteHandler): void;
  get(path: string, middleware: Middleware, handler: RouteHandler): void;
  get(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  get(path: string, ...args: any[]): void {
    this.register('GET', path, args);
  }

  post(path: string, handler: RouteHandler): void;
  post(path: string, middleware: Middleware, handler: RouteHandler): void;
  post(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  post(path: string, ...args: any[]): void {
    this.register('POST', path, args);
  }

  put(path: string, handler: RouteHandler): void;
  put(path: string, middleware: Middleware, handler: RouteHandler): void;
  put(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  put(path: string, ...args: any[]): void {
    this.register('PUT', path, args);
  }

  patch(path: string, handler: RouteHandler): void;
  patch(path: string, middleware: Middleware, handler: RouteHandler): void;
  patch(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  patch(path: string, ...args: any[]): void {
    this.register('PATCH', path, args);
  }

  delete(path: string, handler: RouteHandler): void;
  delete(path: string, middleware: Middleware, handler: RouteHandler): void;
  delete(path: string, middlewares: Middleware[], handler: RouteHandler): void;
  delete(path: string, ...args: any[]): void {
    this.register('DELETE', path, args);
  }

  private register(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    args: any[]
  ): void {
    const { middlewares, handler } = this.splitArgs(args);
    const wrapHandler = (ctx: Context) => Promise.resolve(handler(ctx));
    const m = method.toLowerCase() as
      | 'get'
      | 'post'
      | 'put'
      | 'patch'
      | 'delete';

    if (middlewares.length > 0) {
      this.router.group({ middlewares }, (r) => {
        (r as RuntimeRouter)[m](path, wrapHandler);
      });
    } else {
      this.router[m](path, wrapHandler);
    }
  }

  private splitArgs(args: any[]): {
    middlewares: Middleware[];
    handler: RouteHandler;
  } {
    if (args.length === 1) {
      return { middlewares: [], handler: args[0] };
    }

    if (Array.isArray(args[0])) {
      return { middlewares: args[0], handler: args[1] };
    }

    return { middlewares: [args[0]], handler: args[1] };
  }
}

export type RouteHandler = (ctx: Context) => Response | Promise<Response>;
