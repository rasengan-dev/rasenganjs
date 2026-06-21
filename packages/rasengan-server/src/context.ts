import type { Context } from '@rasenganjs/runtime';
import { json, text, html, redirect } from '@rasenganjs/runtime';

export interface ExtendedContext extends Context {
  json(data: unknown, init?: ResponseInit): Response;
  text(value: string, init?: ResponseInit): Response;
  html(value: string, init?: ResponseInit): Response;
  redirect(url: string, status?: number): Response;
}

export function enhanceContext(ctx: Context): ExtendedContext {
  return {
    ...ctx,
    json: (data: unknown, init?: ResponseInit) => json(data, init),
    text: (value: string, init?: ResponseInit) => text(value, init),
    html: (value: string, init?: ResponseInit) => html(value, init),
    redirect: (url: string, status = 302) => redirect(url, status),
  };
}

export type RouteHandler = (
  ctx: ExtendedContext
) => Response | Promise<Response>;
