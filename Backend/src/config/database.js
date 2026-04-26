import mongoose from 'mongoose';
import config from './config.js';

const connectDatabase = async () => {
    if (!config.mongoUri) {
        throw new Error('MONGO_URI is missing in environment variables');
    }

    await mongoose.connect(config.mongoUri);
    console.log('Database connected successfully');
};

export default connectDatabase;
