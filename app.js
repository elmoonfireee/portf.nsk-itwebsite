// app.js (CommonJS version of the server for Next.js)
const next = require('next');
const http = require('http');
const path = require('path');

// Initialize Next.js application (in production mode)
const app = next({
  dev: false,
  dir: __dirname, // root directory of the application
});

// Get Next.js request handler
const handle = app.getRequestHandler();

// After the app is prepared, start the HTTP server
app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res); // delegate handling to Next.js
  }).listen(process.env.PORT || 3000, () => {
    console.log('✅ Server is running on port 3000');
  });
});
