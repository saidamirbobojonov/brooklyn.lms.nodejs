const UserModel = require('../models/userModel');

// базовая проверка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// пароль: 8+ символов, 1 заглавная, 1 цифра, 1 спецсимвол
function isStrongPassword(password) {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return passwordRegex.test(password);
}

async function validateRegister(data) {
    const errors = [];

    // обязательные поля
    if (!data.firstname) errors.push('Firstname обязателен');
    if (!data.lastname) errors.push('Lastname обязателен');
    if (!data.email) errors.push('Email обязателен');
    if (!data.login) errors.push('Login обязателен');
    if (!data.password) errors.push('Password обязателен');

    // формат email
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Некорректный формат email');
    }

    // сложность пароля
    if (data.password && !isStrongPassword(data.password)) {
        errors.push(
            'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один спецсимвол'
        );
    }

    // уникальность login
    if (data.login) {
        const existingLogin = await UserModel.findByLogin(data.login);
        if (existingLogin) {
            errors.push('Пользователь с таким логином уже существует');
        }
    }

    // уникальность email
    if (data.email) {
        const existingEmail = await UserModel.findByEmail(data.email);
        if (existingEmail) {
            errors.push('Пользователь с таким email уже существует');
        }
    }

    return errors;
}

function validateLogin(data) {
    const errors = [];
    if (!data.login) errors.push('Login обязателен');
    if (!data.password) errors.push('Password обязателен');
    return errors;
}

module.exports = { validateRegister, validateLogin };
