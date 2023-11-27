import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './src/db/schema';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, { schema });

// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: './drizzle/migrations' });