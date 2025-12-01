const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
    connectionString: env.DB_URL,
    ssl: false,
});

pool.on('connect', () => console.log('✅ Подключено к PostgreSQL'));
pool.on('error', (err) => console.error('❌ Ошибка подключения к БД:', err));

module.exports = pool;
