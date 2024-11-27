import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';
import bcrypt from 'bcrypt';
import { adoptionsService, usersService, petsService } from '../src/services/index.js';

describe('API Tests', function () {
    this.timeout(10000);

    // Test to get list of mock users
    it('GET /api/mocks/mockingusers - should return 50 mock users', async () => {
        const response = await request(app).get('/api/mocks/mockingusers');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array').with.lengthOf(50);
    });

    describe('Pets Tests', () => {
        let testPetId;

        before(async () => {
            const newPet = {
                name: 'Bobby',
                specie: 'Dog',
                birthDate: '2022-06-15'
            };

            const response = await request(app).post('/api/pets').send(newPet);
            testPetId = response.body.payload._id;
        });

        after(async function () {
            if(testPetId){
                await request(app).delete(`/api/pets/${testPetId}`);
                console.log('Test pet has been deleted');
            }
        });

        describe('GET /api/pets', () => {
            it('should return all pets', async () => {
                const response = await request(app).get('/api/pets');
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.be.an('array');
            });
        });

        describe('POST /api/pets', () => {
            it('should create a pet successfully', async () => {
                const newPet = {
                    name: 'Bobby',
                    specie: 'Dog',
                    birthDate: '2022-06-15'
                };
                const response = await request(app).post('/api/pets').send(newPet);
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body.payload).to.have.property('_id');

                const petId = response.body.payload._id;
                if (petId) {
                    await request(app).delete(`/api/pets/${petId}`);
                }
            });

            it('should return 400 error if data is missing', async () => {
                const newPet = {
                    name: 'Bobby',
                };
                const response = await request(app).post('/api/pets').send(newPet);
                expect(response.ok).to.be.equal(false);
                expect(response.status).to.equal(400);
                expect(response.body).to.have.property('error', 'Incomplete values');
            });
        });

        describe('PUT /api/pets/:pid', () => {
            it('should update a pet successfully', async () => {
                const updateData = { 
                    name: 'Bobby Updated',
                    specie: 'Cat',
                    birthDate: '2022-06-15'
                };
                const response = await request(app).put(`/api/pets/${testPetId}`).send(updateData);
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message', 'pet updated');
            });
        });

        describe('DELETE /api/pets/:pid', () => {
            it('should delete a pet successfully', async () => {
                const response = await request(app).delete(`/api/pets/${testPetId}`);
                expect(response.ok).to.be.equal(true);
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message', 'pet deleted');
            });
        });
    });

    // Test to generate only users
    it('POST /api/mocks/generateData - should generate only users', async () => {
        const response = await request(app)
            .post('/api/mocks/generateData')
            .send({ users: 10, pets: 0 });
        
        expect(response.status).to.equal(200);
        expect(response.body.insertedUsers).to.be.an('array').with.lengthOf(10);
        expect(response.body.insertedPets).to.be.an('array').with.lengthOf(0);
    });

    // Test to generate only pets
    it('POST /api/mocks/generateData - should generate only pets', async () => {
        const response = await request(app)
            .post('/api/mocks/generateData')
            .send({ users: 0, pets: 5 });
        
        expect(response.status).to.equal(200);
        expect(response.body.insertedUsers).to.be.an('array').with.lengthOf(0);
        expect(response.body.insertedPets).to.be.an('array').with.lengthOf(5);
    });

    // bcrypt hashing service test
    describe('bcrypt hashing tests', () => {
        const password = 'TestPassword123';

        it('should hash the password correctly', async () => {
            const hashedPassword = await bcrypt.hash(password, 10);
            expect(hashedPassword).to.not.equal(password);
        });

        it('should match hashed password with original password', async () => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const isMatch = await bcrypt.compare(password, hashedPassword);
            expect(isMatch).to.be.true;
        });

        it('should not match if the hash is altered', async () => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const alteredHash = hashedPassword.slice(0, -1);
            const isMatch = await bcrypt.compare(password, alteredHash);
            expect(isMatch).to.be.false;
        });
    });

    // User DTO test
    describe('User DTO tests', () => {
        const userDTO = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            password: 'hashedpassword123',
        };

        it('should create full_name from first_name and last_name', () => {
            const transformedUser = {
                ...userDTO,
                full_name: `${userDTO.first_name} ${userDTO.last_name}`,
            };
            expect(transformedUser.full_name).to.equal('John Doe');
        });

        it('should remove password, first_name, last_name properties', () => {
            const { first_name, last_name, password, ...cleanedUserDTO } = {
                ...userDTO,
                full_name: `${userDTO.first_name} ${userDTO.last_name}`,
            };
            expect(cleanedUserDTO).to.have.property('full_name', 'John Doe');
            expect(cleanedUserDTO).to.have.property('email', userDTO.email);
            expect(cleanedUserDTO).to.not.have.property('password');
            expect(cleanedUserDTO).to.not.have.property('first_name');
            expect(cleanedUserDTO).to.not.have.property('last_name');
        });
    });

    // Custom query to fetch adopted pets directly in test after all tests complete
    after(async () => {
        const adoptedPets = await adoptionsService.getAll(); 
        console.log('Adopted pets:', adoptedPets);
    });
});
