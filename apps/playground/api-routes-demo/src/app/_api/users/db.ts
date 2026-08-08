// Not a `middleware.ts`/`*.route.ts` file, so the _api/ glob ignores it —
// a plain module shared by the routes below. Uses @libsql/client instead
// of node:sqlite: Netlify (and Vercel) functions have an ephemeral
// filesystem, so a local file written by node:sqlite never survives
// between invocations in production. libsql speaks the same SQL dialect
// and, via its `file:` URL scheme, also works as a local file for dev —
// only production needs a real Turso database (TURSO_DATABASE_URL /
// TURSO_AUTH_TOKEN, see README for how to provision one).
import { createClient } from '@libsql/client';
import path from 'node:path';

export type User = { id: string; name: string };

const db = createClient({
  url:
    process.env.TURSO_DATABASE_URL ??
    `file:${path.join(process.cwd(), 'shinobi.sqlite')}`,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

const { rows: countRows } = await db.execute(
  'SELECT COUNT(*) AS count FROM users'
);
const count = countRows[0].count as number;

if (count === 0) {
  await db.batch([
    { sql: 'INSERT INTO users (name) VALUES (?)', args: ['Naruto'] },
    { sql: 'INSERT INTO users (name) VALUES (?)', args: ['Sasuke'] },
  ]);
}

function toUser(row: { id: unknown; name: unknown }): User {
  return { id: String(row.id), name: String(row.name) };
}

export async function listUsers(): Promise<User[]> {
  const { rows } = await db.execute('SELECT id, name FROM users ORDER BY id');
  return rows.map(toUser);
}

export async function getUser(id: string): Promise<User | undefined> {
  const { rows } = await db.execute({
    sql: 'SELECT id, name FROM users WHERE id = ?',
    args: [id],
  });

  return rows[0] ? toUser(rows[0]) : undefined;
}

export async function createUser(name: string): Promise<User> {
  const { lastInsertRowid } = await db.execute({
    sql: 'INSERT INTO users (name) VALUES (?)',
    args: [name],
  });

  return { id: String(lastInsertRowid), name };
}

export async function deleteUser(id: string): Promise<boolean> {
  const { rowsAffected } = await db.execute({
    sql: 'DELETE FROM users WHERE id = ?',
    args: [id],
  });

  return rowsAffected > 0;
}
