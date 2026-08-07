import { json } from 'rasengan/server';
import type { Context } from 'rasengan/server';
import { users } from './data.js';

// `index.route.ts` binds to its own folder's path: GET/POST /api/users
export async function GET(_ctx: Context) {
  return json(users);
}

export async function POST(ctx: Context) {
  const body = (await ctx.request.json()) as { name?: string };

  if (!body.name) {
    return json(
      { error: { message: 'name is required', status: 400 } },
      { status: 400 }
    );
  }

  const user = { id: String(users.length + 1), name: body.name };
  users.push(user);

  return json(user, { status: 201 });
}
