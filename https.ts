// Function to handle HTTPS requests
const handleHttpsRequest = (request) => {
  if (request.method === 'POST' && request.url.includes('/deploy')) {
    console.log('Deploying...');
    Bun.spawn({
      cmd: ['sh', './deploy.sh'],
    });
    return new Response('Deployment triggered successfully!', { status: 200 });
  }

  return new Response(
    `Welcome to Bun over HTTPS! Requested path: ${request.url}! SHIP IT V4 🚀`
  );
};

const HTTPS_PORT = process.env.HTTPS_PORT || 443;

Bun.serve({
  port: HTTPS_PORT,
  fetch: handleHttpsRequest,
  tls: {
    cert: Bun.file(process.env.BUN_CERT),
    key: Bun.file(process.env.BUN_KEY),
  },
});

console.log(`Bun servers listening on ports ${HTTPS_PORT}`);
