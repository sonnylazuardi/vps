import { initContract } from '@ts-rest/core';
import { User } from './db/schema';

const c = initContract();

export const contract = c.router({
  postUser: {
    method: 'POST',
    path: '/users',
    responses: {
      201: c.type<User>(),
    },
    body: c.type<{ name: string, email: string }>(),
    summary: 'Create a user',
  },
  putUser: {
    method: 'PUT',
    path: '/users/:id',
    responses: {
      201: c.type<User>(),
    },
    body: c.type<{ name: string, email: string }>(),
    summary: 'Update a user',
  },
  getUser: {
    method: 'GET',
    path: `/users/:id`,
    responses: {
      200: c.type<User | null>(),
    },
    summary: 'Get a user by id',
  },
  getUsers: {
    method: 'GET',
    path: `/users`,
    responses: {
      200: c.type<User[] | null>(),
    },
    summary: 'Get all users',
  },
});