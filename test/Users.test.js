import mongoose from 'mongoose';
import Users from '../src/dao/Users.dao.js';
import Assert from 'assert';

mongoose.connect('mongodb://localhost:27017/test');

const assert = Assert.strict;

describe('Test User DAO', function () {
    before(async function () {
        this.userDao = new Users();
    });
    beforeEach(function () {
        mongoose.connection.collections.users.drop();
        this.timeout(5000);
    });

    it('The Dao should obtain all users in form of an array', async function () {
        const result = await this.userDao.get({ limit: 10 });
        assert.strictEqual(Array.isArray(result), true);
    });
    it('The Dao should add one user to the database', async function () {
        let mockUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: '7WwYf@example.com',
            password: '123456',
            role: 'user',
        };

        const result = await this.userDao.save(mockUser);
        //assert.ok(result._id);
        assert.strictEqual(result.first_name, mockUser.first_name);
        assert.strictEqual(result.last_name, mockUser.last_name);
        assert.strictEqual(result.email, mockUser.email);
        assert.strictEqual(result.role, mockUser.role);
    });

    it('The Dao should add to the insert document an array of empty pets by default', async function () {
        let mockUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: '7WwYf@example.com',
            password: '123456',
            role: 'user',
        };
        const result = await this.userDao.save(mockUser);
        assert.deepStrictEqual(result.pets, []);
    })

    it('The Dao can obtain one user by email', async function () {
        let mockUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: '7WwYf@example.com',
            password: '123456',
            role: 'user',
        };
        const result = await this.userDao.save(mockUser);
        const user = await this.userDao.getBy({email: result.email});
        assert.strictEqual(typeof user, 'object');
    })
});
