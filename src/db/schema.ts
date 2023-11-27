import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  email: text('email'),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;