import express from 'express';
import { generatePets } from '../mocks/mockingPets.js';
import { generateUsers } from '../mocks/mockingUsers.js';

const router = express.Router();

router.get('/mockingpets', (req, res) => {
    const pets = generatePets(100);
    res.status(200).json(pets);
});

router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50);
    res.status(200).json(users);
});

router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;
        const insertedUsers = generateUsers(users);
        const insertedPets = generatePets(pets);
        console.log('Data generated:', { insertedUsers, insertedPets });

        res.status(200).json({
            message: 'Data generated successfully',
            insertedUsers,
            insertedPets,
        });
    } catch (error) {
        console.error('Error generating data:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
