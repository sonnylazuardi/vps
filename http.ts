// // Function to handle HTTP requests
const handleHttpRequest = (request) => {
  const redirectTo = `https://${request.headers.get("host")}`;
  return new Response(null, {
    status: 301,
    headers: { Location: redirectTo },
  });
};

// Run both servers concurrently
Bun.serve({
  port: 80,
  fetch: handleHttpRequest,
});

console.log("Bun servers redirect, running on 80");
