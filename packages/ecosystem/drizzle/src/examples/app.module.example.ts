/**
 * Example: wiring @rasenganjs/drizzle directly into an app's root module.
 *
 * Lives under src/ so `tsc --noEmit` keeps it honest as the package's API
 * evolves — but it's a reference, not runtime code: nothing imports this
 * file, and vitest only picks up `*.test.ts`. Shows the whole chain in
 * one place: schema → adapter → DrizzleModule.forRoot() → app module's
 * imports → DataSource injected in a provider.
 */
import { defineModule, Provider } from '@rasenganjs/server';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleModule, DataSource as GenericDataSource } from '../index.js';
import { nodePostgresAdapter } from '../drivers/node-postgres.js';

// ── 1. Your app's schema — @rasenganjs/drizzle never sees this; it's
//    the ONLY app-specific piece required. ──────────────────────────
const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
});
const schema = { users };

// ── 2. Pick a driver adapter + connection config. Swapping drivers
//    later is "change these two lines" — nothing else in this file
//    or in any provider changes. ─────────────────────────────────────
const adapter = nodePostgresAdapter<typeof schema>();
const connection = { connectionString: process.env.DATABASE_URL };

// ── 3. Configure the singleton ONCE. DrizzleModule.forRoot() connects
//    eagerly and registers DataSource as a normal, container-constructed
//    provider (global: true by default) — throws if called a second
//    time in this process. ───────────────────────────────────────────
export const dbModule = DrizzleModule.forRoot({ adapter, connection, schema });

// A local type alias pins DataSource's generic to THIS app's schema once,
// so every provider below writes bare `DataSource`, fully typed, zero
// type arguments — exactly like importing `DataSource` from `typeorm`.
export type DataSource = GenericDataSource<NodePgDatabase<typeof schema>>;

// ── 4. Inject it anywhere, by name, like any other Provider. ────────
class UserRepository extends Provider {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  findByEmail(email: string) {
    return this.dataSource.db
      .select()
      .from(users)
      .where(eq(users.email, email));
  }
}

// ── 5. Register dbModule directly in the app's root module. ─────────
export const appModule = defineModule({
  name: 'AppModule',
  imports: [dbModule /* , ...your other feature modules */],
  providers: [UserRepository],
});
