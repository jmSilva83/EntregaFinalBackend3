import { Router } from 'express';
import { swaggerUi, swaggerSpecs } from '../utils/swagger.js';
import viewsRouter from './views.router.js';
import mocksRouter from './mocks.router.js';
import usersRouter from './users.router.js';
import petsRouter from './pets.router.js';
import adoptionsRouter from './adoption.router.js';
import sessionsRouter from './sessions.router.js';
import testUserRouter from './testuser.router.js';
import fs from 'fs';
import { join } from 'path';
import __dirname from '../utils/utils.js';

const router = Router();

const customCss = fs.readFileSync(
    join(__dirname, 'public/css/styles.css'),
    'utf8'
);

router.use('/', viewsRouter);
router.use('/api/users', usersRouter);
router.use('/api/pets', petsRouter);
router.use('/api/adoptions', adoptionsRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/api/mocks', mocksRouter);
router.use('/api/testuser', testUserRouter);
router.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs, { customCss })
);

export default router;
