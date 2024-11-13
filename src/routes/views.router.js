import { Router } from 'express';
import {
    renderWelcomePage,
    renderUsersPage,
    renderPetsPage,
    renderRegisterPage,
    renderLoginPage,
} from '../controllers/views.controllers.js';

const router = Router();

router.get('/', renderWelcomePage);
router.get('/users', renderUsersPage);
router.get('/pets', renderPetsPage);
router.get('/register', renderRegisterPage);
router.get('/login', renderLoginPage);

export default router;
