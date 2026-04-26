import app from './src/app.js';
import config from './src/config/config.js';
import connectDatabase from './src/config/database.js';


const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
        process.exit(1);
    }
};

startServer();
