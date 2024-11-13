import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import errorHandler from './errorHandler.js';
import { addLogger } from '../utils/loggers.js';
import __dirname from '../utils/utils.js';
import { join } from 'path';

export default function middlewares(app) {
    app.engine('handlebars', handlebars.engine());
    app.set('views', join(__dirname, 'views'));
    app.set('view engine', 'handlebars');
    
    

    app.use(express.static(join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(addLogger);
    app.use(errorHandler);
}
