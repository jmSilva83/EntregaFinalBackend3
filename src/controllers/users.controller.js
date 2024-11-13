import { usersService } from '../services/index.js';

const getAllUsers = async (req, res) => {
    try {
        const { limit = 5, page = 1 } = req.query;
        const skip = (page - 1) * limit;
        const result = await usersService.getAll({
            limit: parseInt(limit),
            skip: parseInt(skip),
        });

        const totalUsers = await usersService.getTotalCount();
        const totalPages = Math.ceil(totalUsers / limit);

        res.render('users', {
            title: 'Usuarios',
            users: result,  
            pagination: {
                currentPage: parseInt(page), 
                totalPages: totalPages,  
                totalUsers: totalUsers,  
                limit: parseInt(limit), 
                prevPage: page > 1 ? page - 1 : null, 
                nextPage: page < totalPages ? page + 1 : null, 
            },
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
