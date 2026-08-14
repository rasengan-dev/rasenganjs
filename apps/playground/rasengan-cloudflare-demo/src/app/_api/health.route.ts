import { json } from 'rasengan/server';
import type { Context } from 'rasengan/server';

// GET /api/health
export async function GET(_ctx: Context) {
  return json({ status: 'ok' });
}
