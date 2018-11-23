import supertest from 'supertest';
import models from '../models';
import app from '..';
import {sequelize} from '../models';

afterAll(async () => {
    await sequelize.close();
});

describe('Create user test', () => {
    const email = 'user@test.com';
    const password = '123456';

    beforeAll(async () => {
        await models.User.create({
            email,
            password,
        });
    });

    afterAll(async () => {
        await models.User.truncate({cascade: true});
    });

    it('Missing data (email/pass)', async () => {
        const response = await supertest(app).post('/singup');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing credentials');
    });

    it('User invalid password length', async () => {
        const response = await supertest(app)
            .post('/singup')
            .send({email: 'test@test.com', password: '12345'});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Password length must be between 6 and 12');
    });

    it('User ok', async () => {
        const response = await supertest(app)
            .post('/singup')
            .send({email: 'test_2@test.com', password: '123456'});

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('User already exists', async () => {
        const response = await supertest(app)
            .post('/singup')
            .send({email, password});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User already exists');
    });
});

describe('Login', () => {
    const email = 'user@test.com';
    const password = '123456';

    beforeAll(async () => {
        await models.User.create({
            email,
            password,
        });
    });

    afterAll(async () => {
        await models.User.truncate({cascade: true});
    });

    it('Missing data (email/pass)', async () => {
        const response = await supertest(app).post('/login');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing credentials');
    });

    it('User not found', async () => {
        const response = await supertest(app)
            .post('/login')
            .send({email: 'not_found@test.com', password: '123456'});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User not found');
    });

    it('User login ok', async () => {
        const response = await supertest(app)
            .post('/login')
            .send({email, password});

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });
});
