import dotenv from 'dotenv';
import { Command } from 'commander';
import { logger } from './loggers.js';

const program = new Command();

program.requiredOption('-m, --mode <mode>', 'Server mode', 'prod');
program.parse();

const options = program.opts();

dotenv.config({
    path: options.mode == 'dev' ? './.env.dev' : './.env.prod',
});

logger.info(`JWT_SECRET: ${process.env.JWT_SECRET || 'No definido'}`);
logger.info(`JWT_COOKIE: ${process.env.JWT_COOKIE || 'No definido'}`);

export default {
    app: {
        PORT: process.env.PORT || 8080,
    },
    mongo: {
        URL: process.env.MONGO_URL,
    },
    auth: {
        jwt: {
            COOKIE: process.env.JWT_COOKIE || 'coderCookie',
            SECRET: process.env.JWT_SECRET || process.env.SECRET_KEY,
        },
    },
    mode: options.mode,
};
