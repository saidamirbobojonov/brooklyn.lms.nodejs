// routes/authRoutes.js
const { registerController, loginController } = require('../controllers/authController');
const { registerRateLimitCheck } = require('../middlewares/rateLimit');

const authRoutes = [
    {
        method: 'POST',
        path: '/auth/register',
        handler: registerController,
        middlewares: [registerRateLimitCheck],
    },
    {
        method: 'POST',
        path: '/auth/login',
        handler: loginController,
    },
];

module.exports = authRoutes;
