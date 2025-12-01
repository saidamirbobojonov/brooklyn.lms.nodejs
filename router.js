// router.js
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { authMiddleware } = require('./middlewares/authMiddleware');

const routes = [...authRoutes, ...userRoutes];

async function router(req, res, pathname, method) {
  console.log(`➡️ ${method} ${pathname}`);

  const route = routes.find((r) => r.path === pathname && r.method === method);

  if (!route) {
    console.log('❌ Не найден маршрут');
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Маршрут не найден' }));
  }

  console.log('✅ Найден маршрут:', route.method, route.path);

  const middlewares = [];

  if (route.protected) {
    middlewares.push((req, res, next) => authMiddleware(req, res, next));
  }

  if (Array.isArray(route.middlewares)) {
    for (const mw of route.middlewares) {
      if (typeof mw === 'function') {
        middlewares.push(mw);
      } else {
        console.warn('⚠️ route middleware не функция:', mw);
      }
    }
  }

  const runMiddlewares = (index) => {
    if (index >= middlewares.length) {
      const handler = route.handler;
      if (typeof handler !== 'function') {
        console.error('❌ route.handler не функция:', handler, 'в route:', route);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
        }
        return res.end(JSON.stringify({ error: 'Internal server error: handler error' }));
      }

      return Promise.resolve(handler(req, res)).catch((err) => {
        console.error('❌ Unhandled error in handler:', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
        }
        res.end(JSON.stringify({ error: 'Internal server error' }));
      });
    }

    const mw = middlewares[index];

    try {
      mw(req, res, () => runMiddlewares(index + 1));
    } catch (err) {
      console.error('❌ Ошибка в middleware:', err);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
      }
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  };

  runMiddlewares(0);
}

module.exports = { router };
