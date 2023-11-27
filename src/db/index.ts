import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { InsertUser, User, users } from './schema';
import { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);

export const fetchUsers = async () => {
  const result: User[] = db.select().from(users).all();
  return result;
}

export const fetchUser = async (id: number) => {
  const result = db.select().from(users).where(eq(users.id, id)).all().at(0) || null;
  return result;
}

export const insertUser = async (user: InsertUser) => {
  return db.insert(users).values(user).returning();
}

export const deleteUser = async (id: number) => {
  const deletedUser = await db.delete(users)
    .where(eq(users.id, id))
    .returning();

  return deletedUser;
}