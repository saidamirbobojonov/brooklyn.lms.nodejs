const { notFound } = require('./controllers/notFoundController');
const { helloController } = require('./controllers/helloController');

// Роутинг
const routes = {
  'GET /': helloController,
  'GET /ping': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'pong' }));
  },
};

// Обработка маршрутов
async function router(req, res, pathname, method) {
  const routeKey = `${method} ${pathname}`;
  const handler = routes[routeKey] || notFound;

  await handler(req, res);
}

module.exports = { router };
