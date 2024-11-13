import { Router } from 'express';
import {
    renderWelcomePage,
    renderUsersPage,
    renderPetsPage,
    renderRegisterPage,
    renderLoginPage,
} from '../controllers/views.controllers.js';

const router = Router();

// Ruta de bienvenida
router.get('/', renderWelcomePage);

// Ruta para visualizar a todos los usuarios registrados
router.get('/users', renderUsersPage);

// Ruta para visualizar a todas las mascotas registradas
router.get('/pets', renderPetsPage);

// Ruta para visualizar el formulario de registro
router.get('/register', renderRegisterPage);

// Ruta para visualizar el formulario de login
router.get('/login', renderLoginPage);

export default router;
