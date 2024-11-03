import mongoose from 'mongoose';
import { logger } from './loggers.js';

class MongoSingleton {
    static #instance;

    constructor() {
        mongoose
            .connect(process.env.MONGO_URL)
            .then(() =>
                logger.info(`Connected to MongoDB from process ${process.pid}`)
            )
            .catch((err) => logger.error('Error connecting to MongoDB', err));
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    }
}

export default MongoSingleton;
