import mongoose from 'mongoose';
import config from './config.js';

const removeStaleUserIndexes = async () => {
    const usersCollection = mongoose.connection.collection('users');
    const indexes = await usersCollection.indexes();
    const hasUsernameIndex = indexes.some((index) => index.name === 'username_1');

    if (hasUsernameIndex) {
        await usersCollection.dropIndex('username_1');
        console.log('Removed stale users.username_1 index');
    }
};

const connectDatabase = async () => {
    if (!config.mongoUri) {
        throw new Error('MONGO_URI is missing in environment variables');
    }

    await mongoose.connect(config.mongoUri);
    await removeStaleUserIndexes();
    console.log('Database connected successfully');
};

export default connectDatabase;
