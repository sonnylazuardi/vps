import { contract } from './contract';
import { fetchUser, fetchUsers, insertUser, updateUser } from './db/users';
import { initServer } from '@ts-rest/express';

const s = initServer();
export const router = s.router(contract, {
  getUser: async ({ params: { id } }) => {
    const result = await fetchUser(parseInt(id));
    return {
      status: 200,
      body: result ?? null,
    };
  },
  getUsers: async () => {
    const result = await fetchUsers();
    return {
      status: 200,
      body: result,
    };
  },
  postUser: async ({ body: { name, email } }) => {
    const [result] = await insertUser({ name, email });
    return {
      status: 200,
      body: result,
    };
  },
  putUser: async ({ params: { id }, body }) => {
    const [result] = await updateUser(parseInt(id), body);
    return {
      status: 200,
      body: result,
    };
  },
});