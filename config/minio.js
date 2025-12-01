const Minio = require('minio');
const env = require('./env');

// Создаём клиента MinIO
const minioClient = new Minio.Client({
    endPoint: env.MINIO_ENDPOINT,
    port: env.MINIO_PORT,
    useSSL: false, // можно включить при необходимости
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
});

// Проверяем, существует ли bucket — если нет, создаём
async function ensureBucketExists() {
    try {
        const exists = await minioClient.bucketExists(env.MINIO_BUCKET);
        if (!exists) {
            await minioClient.makeBucket(env.MINIO_BUCKET, 'us-east-1');
            console.log(`🪣 Bucket "${env.MINIO_BUCKET}" создан`);
        } else {
            console.log(`✅ Bucket "${env.MINIO_BUCKET}" существует`);
        }
    } catch (err) {
        console.error('❌ Ошибка при проверке/создании bucket:', err.message);
    }
}

// Выполняем проверку при старте
ensureBucketExists();

module.exports = minioClient;
