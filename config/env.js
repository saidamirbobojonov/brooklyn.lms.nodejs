require('dotenv').config();

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,

    // PostgreSQL
    DB_URL: process.env.DB_URL || 'postgresql://postgres:Sheep2003@localhost:5432/lms',

    // MinIO
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || 'localhost',
    MINIO_PORT: parseInt(process.env.MINIO_PORT, 10) || 9000,
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY || 'minioadmin',
    MINIO_BUCKET: process.env.MINIO_BUCKET || 'lms-files',

    // JWT
    JWT_SECRET: process.env.JWT_SECRET || 'changeme',
};

module.exports = env;
