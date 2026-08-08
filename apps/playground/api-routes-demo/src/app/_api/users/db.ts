// Not a `middleware.ts`/`*.route.ts` file, so the _api/ glob ignores it —
// a plain module shared by the routes below. Uses node:sqlite (built
// into Node >=22.5, no extra dependency) instead of the earlier
// in-memory array — a real file on disk means the data now survives
// rasengan dev's per-request module-runner reset too, not just prod.
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

export type User = { id: string; name: string };

const db = new DatabaseSync(path.join(process.cwd(), 'shinobi.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

const { count } = db.prepare('SELECT COUNT(*) AS count FROM users').get() as {
  count: number;
};

if (count === 0) {
  const insert = db.prepare('INSERT INTO users (name) VALUES (?)');
  insert.run('Naruto');
  insert.run('Sasuke');
}

function toUser(row: { id: number; name: string }): User {
  return { id: String(row.id), name: row.name };
}

export function listUsers(): User[] {
  const rows = db.prepare('SELECT id, name FROM users ORDER BY id').all() as {
    id: number;
    name: string;
  }[];

  return rows.map(toUser);
}

export function getUser(id: string): User | undefined {
  const row = db.prepare('SELECT id, name FROM users WHERE id = ?').get(id) as
    { id: number; name: string } | undefined;

  return row ? toUser(row) : undefined;
}

export function createUser(name: string): User {
  const { lastInsertRowid } = db
    .prepare('INSERT INTO users (name) VALUES (?)')
    .run(name);

  return { id: String(lastInsertRowid), name };
}

export function deleteUser(id: string): boolean {
  const { changes } = db.prepare('DELETE FROM users WHERE id = ?').run(id);
  return Number(changes) > 0;
}
