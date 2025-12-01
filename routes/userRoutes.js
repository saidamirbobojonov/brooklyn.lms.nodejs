const { getUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const userRoutes = [
    {
        method: 'GET',
        path: '/users/me',
        protected: true,
        handler: getUserProfile,
    },
];

module.exports = userRoutes;
