import { usersService } from '../services/index.js';
import { createHash, passwordValidation } from '../utils/utils.js';
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import { logger } from '../utils/loggers.js';
import config from '../utils/config.js';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password)
            return res
                .status(400)
                .send({ status: 'error', error: 'Incomplete values' });
        const exists = await usersService.getUserByEmail(email);
        if (exists)
            return res
                .status(400)
                .send({ status: 'error', error: 'User already exists' });
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
        };
        const result = await usersService.create(user);
        logger.info(result);
        res.send({ status: 'success', payload: result._id });
    } catch (error) {
        logger.error(error.message || 'Error en el registro');
        res.status(500).send({
            status: 'error',
            error: 'Internal Server Error',
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .send({ status: 'error', error: 'Incomplete values' });

        const user = await usersService.getUserByEmail(email);
        if (!user)
            return res
                .status(404)
                .send({ status: 'error', error: "User doesn't exist" });

        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword)
            return res
                .status(400)
                .send({ status: 'error', error: 'Incorrect password' });

        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, config.auth.jwt.SECRET, {
            expiresIn: '1h',
        });
        res.cookie(config.auth.jwt.COOKIE, token, {
            maxAge: 3600000}).redirect('/');
    } catch (error) {
        logger.error(error.message || 'Error en el login');
        res.status(500).send({
            status: 'error',
            error: 'Internal Server Error',
        });
    }
};

const current = async (req, res) => {
    try {
        const cookie = req.cookies[config.auth.jwt.COOKIE];
        if (!cookie) throw new Error('No token provided');

        const user = jwt.verify(cookie, config.auth.jwt.SECRET);
        res.send({ status: 'success', payload: user });
    } catch (error) {
        logger.error(error.message || 'Token verification failed');
        res.status(401).send({ status: 'error', error: 'Unauthorized' });
    }
};

const unprotectedLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res
            .status(400)
            .send({ status: 'error', error: 'Incomplete values' });
    const user = await usersService.getUserByEmail(email);
    if (!user)
        return res
            .status(404)
            .send({ status: 'error', error: "User doesn't exist" });
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword)
        return res
            .status(400)
            .send({ status: 'error', error: 'Incorrect password' });
    const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: '1h' });
    res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({
        status: 'success',
        message: 'Unprotected Logged in',
    });
};
const unprotectedCurrent = async (req, res) => {
    const cookie = req.cookies['unprotectedCookie'];
    const user = jwt.verify(cookie, 'tokenSecretJWT');
    if (user) return res.send({ status: 'success', payload: user });
};
export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent,
};
