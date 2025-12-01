const UserModel = require('../models/userModel');

async function getUserProfile(req, res) {
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Пользователь не найден' }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ошибка сервера' }));
    }
}

module.exports = { getUserProfile };
