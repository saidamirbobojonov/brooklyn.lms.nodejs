const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const { router } = require('./router');
const env = require('./config/env');
require('./config/minio');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  let body = '';
  req.on('data', chunk => (body += chunk.toString()));
  req.on('end', async () => {
    if (req.headers['content-type'] === 'application/json') {
      try {
        req.body = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    }

    await router(req, res, pathname, method);
  });
});

server.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`);
});
