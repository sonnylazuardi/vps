// // Function to handle HTTP requests
const handleHttpRequest = (request) => {
  const redirectTo = `https://${request.headers.get("host")}`;
  return new Response(null, {
    status: 301,
    headers: { Location: redirectTo },
  });
};

const HTTP_PORT = process.env.HTTP_PORT || 80;
// Run both servers concurrently
Bun.serve({
  port: HTTP_PORT,
  fetch: handleHttpRequest,
});

console.log(`Bun servers redirect, running on ${HTTP_PORT}`);
