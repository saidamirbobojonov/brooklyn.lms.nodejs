// middlewares/rateLimit.js

const attempts = new Map();
const WINDOW_MS = 60 * 60 * 1000; // 1 час

function registerRateLimitCheck(req, res, next) {
    const now = Date.now();

    const key =
        (req.user && req.user.id) ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress;

    const lastAttempt = attempts.get(key);

    if (lastAttempt && now - lastAttempt < WINDOW_MS) {
        const retryAfterMs = WINDOW_MS - (now - lastAttempt);
        const retryAfterSec = Math.ceil(retryAfterMs / 1000);

        res.writeHead(429, {
            'Content-Type': 'application/json',
            'Retry-After': retryAfterSec.toString(),
        });
        return res.end(
            JSON.stringify({
                error: 'Слишком много запросов. Попробуйте позже',
                retryAfterSeconds: retryAfterSec,
            })
        );
    }

    // просто запоминаем ключ, лимит будем ставить ТОЛЬКО при успешной регистрации
    req._rateLimitKey = key;
    next();
}

function setRegisterRateLimit(key) {
    if (!key) return;
    attempts.set(key, Date.now());
}

module.exports = { registerRateLimitCheck, setRegisterRateLimit };
