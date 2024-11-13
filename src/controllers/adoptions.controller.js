import {
    adoptionsService,
    petsService,
    usersService,
} from '../services/index.js';

const getAllAdoptions = async (req, res) => {
    try {
        const result = await adoptionsService.getAll();
        res.status(200).send({ status: 'success', payload: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            error: 'Error fetching adoptions',
        });
    }
};

const getAdoption = async (req, res) => {
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionsService.getBy({ _id: adoptionId });
        if (!adoption) {
            return res
                .status(404)
                .send({ status: 'error', error: 'Adoption not found' });
        }
        res.status(200).send({ status: 'success', payload: adoption });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            error: 'Error fetching adoption',
        });
    }
};

const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params;

        // Verificar que el usuario exista
        const user = await usersService.getUserById(uid);
        if (!user) {
            return res
                .status(404)
                .send({ status: 'error', error: 'User not found' });
        }

        // Verificar que la mascota exista
        const pet = await petsService.getBy({ _id: pid });
        if (!pet) {
            return res
                .status(404)
                .send({ status: 'error', error: 'Pet not found' });
        }

        // Verificar si la mascota ya ha sido adoptada
        if (pet.adopted) {
            return res
                .status(400)
                .send({ status: 'error', error: 'Pet is already adopted' });
        }

        // Crear la adopción
        user.pets.push(pet._id);
        await usersService.update(user._id, { pets: user.pets });
        await petsService.update(pet._id, { adopted: true, owner: user._id });
        await adoptionsService.create({ owner: user._id, pet: pet._id });

        res.status(201).send({
            status: 'success',
            message: 'Pet adopted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            error: 'Error creating adoption',
        });
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption,
};
