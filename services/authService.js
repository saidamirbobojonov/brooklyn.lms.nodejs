const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const env = require('../config/env');

const authService = {
  async register(data) {
    const existingLogin = await UserModel.findByLogin(data.login);
    if (existingLogin) throw new Error('Пользователь с таким логином уже существует');

    const existingEmail = await UserModel.findByEmail(data.email);
    if (existingEmail) throw new Error('Пользователь с таким email уже существует');

    const user = await UserModel.create(data);
    return user;
  },

  async login(login, password) {
    const user = await UserModel.findByLogin(login);
    if (!user) throw new Error('Неверный логин или пароль');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Неверный логин или пароль');

    // Создаём JWT токен
    const token = jwt.sign(
        { id: user.id, role: user.role },
        env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    delete user.password;

    // 👇 Приветствие по роли
    let message = "Welcome student!";

    if (user.role === "admin") message = "Welcome admin!";
    if (user.role === "teacher") message = "Welcome teacher!";

    return { token, user, message };
  },


};

module.exports = { authService };
