import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { InsertUser, User, users } from './schema';
import * as schema from './schema';
import { eq } from 'drizzle-orm';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });

export const fetchUsers = async () => {
  const result = await db.query.users.findMany();
  return result;
}

export const fetchUser = async (id: number) => {
  const result = await db.query.users.findMany({ where: eq(users.id, id) });
  return result[0];
}

export const updateUser = async (id: number, body: User) => {
  const result = await db.update(users)
    .set(body)
    .where(eq(users.id, id)).returning();
  return result;
}

export const insertUser = async (user: InsertUser) => {
  const result = await db.insert(users).values(user).returning();
  return result;
}

export const deleteUser = async (id: number) => {
  const deletedUser = await db.delete(users)
    .where(eq(users.id, id))
    .returning();

  return deletedUser;
}