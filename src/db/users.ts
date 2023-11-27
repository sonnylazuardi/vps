import { db } from ".";
import { InsertUser, User, users } from './schema';
import { eq } from 'drizzle-orm';

export const fetchUsers = async () => {
  const result = await db.query.users.findMany();
  return result as unknown as User[];
}

export const fetchUser = async (id: number) => {
  const [result] = await db.query.users.findMany({ where: eq(users.id, id) });
  return result;
}

export const updateUser = async (id: number, body: InsertUser) => {
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