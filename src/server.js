import cluster from 'node:cluster';
import { cpus } from 'node:os';
import app from './app.js';
import config from './utils/config.js';
import { logger } from './utils/loggers.js';

const PORT = config.app.PORT;
const numCPUs = cpus().length;
logger.info(`Number of CPUs: ${numCPUs}`);

const startServer = () => {
    // if (cluster.isPrimary) {
    //     logger.info('Primary process, creating workers...');
    //     for (let i = 0; i < numCPUs; i++) {
    //         cluster.fork();
    //     }
    //     cluster.on('message', (worker) => {
    //         logger.info(`Message received from worker ${worker.process.pid}`);
    //     });
    // } else {
        logger.info(`I'm a worker process with ID ${process.pid}`);
        const server = app.listen(PORT, (err) => {
            if (err) {
                logger.error('Error: ', err);
            } else {
                logger.info(
                    `Worker ${process.pid} is listening on port: ${PORT}`
                );
            }
        });

        process.on('SIGINT', () => {
            server.close(() => {
                logger.info(
                    'Server stopped manually (Ctrl + C). The server has been shut down gracefully. See you soon!'
                );
                process.exit(0);
            });
        });

        process.on('SIGTERM', () => {
            server.close(() => {
                logger.info(
                    'Server gracefully shutting down due to SIGTERM (termination signal), The server was shut down by a system request. See you soon!'
                );
                process.exit(0);
            });
        });
    //}
};

export default startServer;
