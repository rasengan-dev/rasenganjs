import type { Context } from '@rasenganjs/runtime';

interface RouteRegistrar {
  get(path: string, handler: (ctx: Context) => Promise<Response>): unknown;
  post(path: string, handler: (ctx: Context) => Promise<Response>): unknown;
  put(path: string, handler: (ctx: Context) => Promise<Response>): unknown;
  patch(path: string, handler: (ctx: Context) => Promise<Response>): unknown;
  delete(path: string, handler: (ctx: Context) => Promise<Response>): unknown;
}

export class Router {
  constructor(private registrar: RouteRegistrar) {}

  get(path: string, handler: RouteHandler): void {
    this.registrar.get(path, (ctx) => Promise.resolve(handler(ctx)));
  }

  post(path: string, handler: RouteHandler): void {
    this.registrar.post(path, (ctx) => Promise.resolve(handler(ctx)));
  }

  put(path: string, handler: RouteHandler): void {
    this.registrar.put(path, (ctx) => Promise.resolve(handler(ctx)));
  }

  patch(path: string, handler: RouteHandler): void {
    this.registrar.patch(path, (ctx) => Promise.resolve(handler(ctx)));
  }

  delete(path: string, handler: RouteHandler): void {
    this.registrar.delete(path, (ctx) => Promise.resolve(handler(ctx)));
  }
}

export type RouteHandler = (ctx: Context) => Response | Promise<Response>;
