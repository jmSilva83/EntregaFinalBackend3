import express from 'express';
import connectDB from './utils/index.js';
import middlewares from './middlewares/index.js';
import appRouter from './routes/index.js';
import { logger } from './utils/loggers.js';
import startServer from './server.js';

logger.info(process.pid);

const app = express();
export default app;

(async () => {
    try {
        await connectDB();
        middlewares(app);
        app.use(appRouter);
        startServer();
    } catch (err) {
        logger.error('Error connecting to the database:', err);
        process.exit(1);
    }
})();
