// controllers/authController.js
const { authService } = require('../services/authService');
const { validateRegister, validateLogin } = require('../utils/validator');
const { setRegisterRateLimit } = require('../middlewares/rateLimit');

async function registerController(req, res) {
    try {
        const errors = await validateRegister(req.body);
        if (errors.length > 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ errors }));
        }

        const user = await authService.register(req.body);

        if (req._rateLimitKey) {
            setRegisterRateLimit(req._rateLimitKey);
        }

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Пользователь зарегистрирован', user }));
    } catch (err) {
        console.error('registerController error:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
}

async function loginController(req, res) {
    try {
        const errors = validateLogin(req.body);
        if (errors.length > 0) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ errors }));
        }

        const { login, password } = req.body;
        const { token, user, message } = await authService.login(login, password);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token, user, message }));
    } catch (err) {
        console.error('loginController error:', err);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
}

module.exports = { registerController, loginController };
