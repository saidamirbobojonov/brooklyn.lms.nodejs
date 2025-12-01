const jwt = require('jsonwebtoken');
const env = require('../config/env');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Нет токена' }));
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Неверный или просроченный токен' }));
    }
}

module.exports = { authMiddleware };
