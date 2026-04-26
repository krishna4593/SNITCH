import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: Number(process.env.PORT) || 3000,
    mongoUri: process.env.MONGO_URI || '',
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'change_this_jwt_secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    cookieExpireMs: Number(process.env.COOKIE_EXPIRE_MS) || 7 * 24 * 60 * 60 * 1000,
};

export default config;
