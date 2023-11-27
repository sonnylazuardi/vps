import { fetchUsers, insertUser } from "./src/db";

// Function to handle HTTPS requests
const handleHttpsRequest = async (request) => {
  if (request.method === 'POST' && request.url.includes('/deploy')) {
    console.log('Deploying...');
    Bun.spawn({
      cmd: ['sh', './deploy.sh'],
    });
    return new Response('Deployment triggered successfully!', { status: 200 });
  }

  if (request.method === 'POST' && request.url.includes('/users')) {
    console.log('Adding a user...');
    insertUser({ name: 'Bun', email: 'bun@bun.sh' });
    return new Response('ok', { status: 200 });
  }

  if (request.method === 'GET' && request.url.includes('/users')) {
    console.log('Adding a user...');
    const users = await fetchUsers();
    const usersJson = JSON.stringify(users);
    return new Response(usersJson, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(
    `Welcome to Bun over HTTPS! Requested path: ${request.url}! SHIP IT V10 🚀`
  );
};

const HTTPS_PORT = process.env.HTTPS_PORT || 443;

Bun.serve({
  port: HTTPS_PORT,
  fetch: handleHttpsRequest,
  ...(process.env.BUN_CERT && process.env.BUN_KEY && {
    tls: {
      cert: Bun.file(process.env.BUN_CERT),
      key: Bun.file(process.env.BUN_KEY),
    }
  }),
});

console.log(`Bun servers listening on ports ${HTTPS_PORT}`);
