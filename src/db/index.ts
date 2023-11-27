import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { InsertUser, User, users } from './schema';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);

export const fetchUsers = async () => {
  const result: User[] = db.select().from(users).all();
  return result;
}

export const insertUser = async (user: InsertUser) => {
  return db.insert(users).values(user).run();
}