// app.js (CommonJS wersja)
const next = require('next');
const http = require('http');
const path = require('path');

const app = next({
  dev: false,
  dir: __dirname,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(process.env.PORT || 3000, () => {
    console.log('✅ Serwer działa na porcie 3000');
  });
});
