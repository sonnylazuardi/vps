import express from 'express';
import { createServer } from 'https';
import { fetchUsers, insertUser } from "./src/db";

const app = express();

app.get('/', (req, res) => {
  res.send(`Welcome to Bun over HTTPS! Requested path: ${req.url}! SHIP IT V10 🚀`);
});

app.post('/deploy', (req, res) => {
  console.log('Deploying...');
  Bun.spawn({
    cmd: ['sh', './deploy.sh'],
  });
  res.send(`Deployment triggered successfully!`);
});

app.post('/users', (req, res) => {
  console.log('Adding a user...');
  insertUser({ name: 'Bun', email: 'bun@bun.sh' });
  res.send('ok');
});

app.get('/users', async (req, res) => {
  console.log('List users...');
  const users = await fetchUsers();
  res.json(users);
});

const HTTPS_PORT = process.env.HTTPS_PORT || 443;

createServer(process.env.BUN_CERT && {
  cert: Bun.file(process.env.BUN_CERT),
  key: Bun.file(process.env.BUN_KEY),
} || {}, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}...`);
});
