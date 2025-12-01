const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

(async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, '../db/init.sql'), 'utf8');
        await pool.query(sql);
        console.log('✅ Таблица users успешно создана / обновлена');
        process.exit(0);
    } catch (err) {
        console.error('❌ Ошибка миграции:', err.message);
        process.exit(1);
    }
})();
