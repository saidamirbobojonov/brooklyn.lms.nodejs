const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class UserModel {
    // создание нового пользователя
    static async create({ firstname, lastname, email, login, password, role = 'student', status = 'upcoming' }) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
      INSERT INTO users (firstname, lastname, email, login, password, role, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, firstname, lastname, email, login, role, status;
    `;
        const values = [firstname, lastname, email, login, hashedPassword, role, status];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // поиск пользователя по логину
    static async findByLogin(login) {
        const result = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
        return result.rows[0];
    }

    // 👇 ДОБАВЬ ЭТО — поиск пользователя по email
    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    // поиск по id (для user profile и др.)
    static async findById(id) {
        const result = await pool.query(
            'SELECT id, firstname, lastname, email, login, role, status FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = UserModel;
