import dotenv from 'dotenv';

dotenv.config();
if (!process.env.JWT_SECRET) {
    console.warn("Warning: JWT_SECRET is not set in environment variables. Using default secret. This is not recommended for production.");
}
if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn("Warning: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not set in environment variables. Google OAuth will not work properly.");
}
if(!process.env.IMAGEKIT_SECRET_KEY) {
    console.warn("Warning: IMAGEKIT_SECRET_KEY is not set in environment variables. Image upload functionality will not work properly.");
}
if(!process.env.MONGO_URI) {
    console.warn("Warning: MONGO_URI is not set in environment variables. Database connection will fail.");
}

  
if(!process.env.NODE_ENV) {
    console.warn("Warning: NODE_ENV is not set in environment variables. Defaulting to 'development'.");
}

const config = {
    port: Number(process.env.PORT) || 3000,
    mongoUri: process.env.MONGO_URI || '',
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'change_this_jwt_secret',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    imagekitSecretKey: process.env.IMAGEKIT_SECRET_KEY || '',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    cookieExpireMs: Number(process.env.COOKIE_EXPIRE_MS) || 7 * 24 * 60 * 60 * 1000,
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:5174')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
};

export default config;
