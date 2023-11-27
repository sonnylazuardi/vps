import express from 'express';
import { createServer } from 'https';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Bun!');
});

createServer({
  cert: Bun.file(process.env.BUN_CERT),
  key: Bun.file(process.env.BUN_KEY),
}, app).listen(443, 'localhost', () => {
  console.log(`Listening on port 443...`);
});

