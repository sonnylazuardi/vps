// Function to handle HTTPS requests
const handleHttpsRequest = (request) => {
  console.log('Request received! ', request);
  if (request.method === 'POST' && request.url.includes('/deploy')) {
    console.log('Deploying...');

    const deploy = Bun.spawn({
      cmd: ['sh', './deploy.sh'],
    });
    deploy.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    deploy.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    deploy.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    return new Response('Deployment triggered successfully!', { status: 200 });
  }

  return new Response(
    `Welcome to Bun over HTTPS! Requested path: ${request.url}! SHIP IT LGTM 🚀`
  );
};

Bun.serve({
  port: 443,
  fetch: handleHttpsRequest,
  tls: {
    cert: Bun.file("/etc/letsencrypt/live/vps.sonnylab.com/fullchain.pem"),
    key: Bun.file("/etc/letsencrypt/live/vps.sonnylab.com/privkey.pem"),
  },
});

console.log("Bun servers listening on ports 443");
