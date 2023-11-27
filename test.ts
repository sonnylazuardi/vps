import express from 'express';
import { createServer } from 'https';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Bun!');
});

const HTTPS_PORT = process.env.HTTPS_PORT || 443;

createServer({
  cert: Bun.file(process.env.BUN_CERT),
  key: Bun.file(process.env.BUN_KEY),
}, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}...`);
});

