import express from 'express';
import bodyParser from "body-parser";
import { createServer } from 'https';
import { deleteUser, fetchUser, fetchUsers, insertUser, updateUser } from "./src/db";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Welcome to Bun over HTTPS! Requested path: ${req.url}! SHIP IT V12 🚀`);
});

app.post('/deploy', (req, res) => {
  console.log('Deploying...');
  Bun.spawn({
    cmd: ['sh', './deploy.sh'],
  });
  res.send(`Deployment triggered successfully!`);
});

app.post('/users', async (req, res) => {
  const result = await insertUser({ name: req.body.name, email: req.body.email });
  res.json(result);
});

app.delete('/users/:id', async (req, res) => {
  const result = await deleteUser(req.params.id);
  res.json(result);
});

app.get('/users/:id', async (req, res) => {
  const result = await fetchUser(req.params.id);
  res.json(result);
});

app.put('/users/:id', async (req, res) => {
  const result = await updateUser(req.params.id, req.body);
  res.json(result);
});

app.get('/users', async (req, res) => {
  const result = await fetchUsers();
  res.json(result);
});

const HTTPS_PORT = process.env.HTTPS_PORT || 443;

createServer(process.env.BUN_CERT && {
  cert: Bun.file(process.env.BUN_CERT),
  key: Bun.file(process.env.BUN_KEY),
} || {}, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}...`);
});
