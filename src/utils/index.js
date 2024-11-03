import config from './config.js';
import MongoSingleton from './mongoSingleton.js';
import { logger } from './loggers.js';
import cluster from 'cluster';

const connectDB = async () => {
    try {
        await MongoSingleton.getInstance(config.mongo.URL);
        logger.info(`Connected to MongoDB from process ${process.pid}`);
    } catch (connectionError) {
        logger.error('MongoDB connection error:', connectionError);
    }
};

if (cluster.isPrimary) {
    await connectDB();
} else {
    logger.info(`I am a worker process with ID ${process.pid}`);
}

export default connectDB;
