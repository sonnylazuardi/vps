// Function to handle HTTPS requests
const handleHttpsRequest = (request) => {
  return new Response(
    `Welcome to Bun over HTTPS! Requested path: ${request.url}`
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
