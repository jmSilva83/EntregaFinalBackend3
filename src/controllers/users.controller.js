import { usersService } from '../services/index.js';

const getAllUsers = async (req, res) => {
    try {
        const { limit = 5, page = 1 } = req.query;
        const result = await usersService.getAll({
            limit: parseInt(limit),
            page: parseInt(page),
        });

        res.send({
            status: 'success',
            payload: result,
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error fetching users',
        });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res
                .status(404)
                .send({ status: 'error', error: 'User not found' });
        }
        res.send({ status: 'success', payload: user });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error fetching user',
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res
                .status(404)
                .send({ status: 'error', error: 'User not found' });
        }
        await usersService.update(userId, updateBody);
        res.send({ status: 'success', message: 'User updated' });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error updating user',
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            return res
                .status(404)
                .send({ status: 'error', error: 'User not found' });
        }
        await usersService.delete(userId);
        res.send({ status: 'success', message: 'User deleted' });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Error deleting user',
        });
    }
};

export default {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
};
