import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import __dirname from './utils.js';

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Adoptame API',
            version: '1.0.0',
            description: 'Documentación de la API de Adoptame',
        },
    },
    apis: [path.join(__dirname, '/docs/**/*.yaml')],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpecs };
