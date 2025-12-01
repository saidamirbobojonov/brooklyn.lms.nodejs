const http = require('http');
const url = require('url');
const { router } = require('./router');
const { parse } = require('querystring');

// Порт по умолчанию
const PORT = process.env.PORT || 3000;

// Основной HTTP сервер
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method.toUpperCase();
  const pathname = parsedUrl.pathname;

  // Парсим тело запроса (если нужно)
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    if (req.headers['content-type'] === 'application/json') {
      try {
        req.body = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
    } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      req.body = parse(body);
    } else {
      req.body = body;
    }

    // Роутинг
    await router(req, res, pathname, method);
  });
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
