import express from 'express';
import bodyParser from "body-parser";
import { createServer } from 'https';
import { createExpressEndpoints } from '@ts-rest/express';
import { router } from './src/router';
import { contract } from './src/contract';
import { generateOpenApi } from '@ts-rest/open-api';
import * as swaggerUi from 'swagger-ui-express';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Welcome to Bun over HTTPS! SHIP IT V14 🚀`);
});

app.post('/deploy', (req, res) => {
  console.log('Deploying...');
  Bun.spawn({
    cmd: ['sh', './deploy.sh'],
  });
  res.send(`Deployment triggered successfully!`);
});

createExpressEndpoints(contract, router, app);

const openApiDocument = generateOpenApi(contract, {
  info: {
    title: 'VPS API',
    version: '1.0.0',
  },
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

const HTTPS_PORT = process.env.HTTPS_PORT || 443;

const options: any = process.env.BUN_CERT ? {
  cert: Bun.file(process.env.BUN_CERT),
  key: Bun.file(process.env.BUN_KEY),
} : {};

createServer(options, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}...`);
});
