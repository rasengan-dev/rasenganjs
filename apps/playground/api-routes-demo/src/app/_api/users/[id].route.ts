import { json, NotFoundError } from 'rasengan/server';
import type { Context } from 'rasengan/server';
import { getUser, deleteUser } from './db.js';

// [id] -> :id, so ctx.params.id is available in every handler below
export async function GET(ctx: Context) {
  const user = await getUser(ctx.params.id);

  // Thrown HttpError subclasses are caught by createApiRouterMiddleware
  // and formatted as JSON with the matching status (RFC-0008 §7).
  if (!user) {
    throw new NotFoundError(`User ${ctx.params.id} not found`);
  }

  return json(user);
}

export async function DELETE(ctx: Context) {
  if (!(await deleteUser(ctx.params.id))) {
    throw new NotFoundError(`User ${ctx.params.id} not found`);
  }

  // 204 No Content can't carry a body per the Fetch spec — json(null, ...)
  // would try anyway and throw, so this bypasses it.
  return new Response(null, { status: 204 });
}
