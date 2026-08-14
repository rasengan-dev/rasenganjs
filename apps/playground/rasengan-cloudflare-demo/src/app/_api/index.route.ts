import { Context } from 'rasengan/server';

export function GET(ctx: Context) {
  return ctx.res.json({ ok: true });
}
