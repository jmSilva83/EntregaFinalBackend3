import { Router } from 'express';
import testUserController from '../controllers/testUser.controller.js';

const router = Router();

router.get('/testuser', testUserController.getTestUser);

export default router;
