// src/controllers/views.controller.js
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';

export const renderWelcomePage = (req, res) => {
    res.render('welcome', { title: 'Bienvenido a Adoptme' });
};

export const renderRegisterPage = (req, res) => {
    res.render('register');
};

export const renderUsersPage = async (req, res) => {
    try {
        const users = await User.find().lean();
        res.render('users', { title: 'Usuarios Registrados', users });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al cargar la vista de usuarios');
    }
};

export const renderPetsPage = async (req, res) => {
    try {
        const pets = await Pet.find().lean();
        res.render('pets', { title: 'Mascotas Registradas', pets });
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        res.status(500).send('Error al cargar la vista de mascotas');
    }
};

export const renderLoginPage = (req, res) => {
    res.render('login', { title: 'Iniciar sesión' });
};



