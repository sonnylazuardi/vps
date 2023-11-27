import express from 'express';
import { deleteUser, fetchUser, fetchUsers, insertUser, updateUser } from "../db/users";
const usersRoute = express.Router();

usersRoute.post('/', async (req, res) => {
  const result = await insertUser({ name: req.body.name, email: req.body.email });
  res.json(result);
});

usersRoute.delete('/:id', async (req, res) => {
  const result = await deleteUser(req.params.id);
  res.json(result);
});

usersRoute.get('/:id', async (req, res) => {
  const result = await fetchUser(req.params.id);
  res.json(result);
});

usersRoute.put('/:id', async (req, res) => {
  const result = await updateUser(req.params.id, req.body);
  res.json(result);
});

usersRoute.get('/', async (req, res) => {
  const result = await fetchUsers();
  res.json(result);
});

export default usersRoute;