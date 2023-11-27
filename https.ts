import express from 'express';
import bodyParser from "body-parser";
import { createServer } from 'https';
import usersRoute from './src/routes/users';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Welcome to Bun over HTTPS! Requested path: ${req.url}! SHIP IT V13 🚀`);
});

app.post('/deploy', (req, res) => {
  console.log('Deploying...');
  Bun.spawn({
    cmd: ['sh', './deploy.sh'],
  });
  res.send(`Deployment triggered successfully!`);
});

app.use('/users', usersRoute);

const HTTPS_PORT = process.env.HTTPS_PORT || 443;

createServer(process.env.BUN_CERT && {
  cert: Bun.file(process.env.BUN_CERT),
  key: Bun.file(process.env.BUN_KEY),
} || {}, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}...`);
});
