import supertest from 'supertest';
import http from 'http';
import {startTestServer, endTestSerer} from '../utils/test';
import models from '../models';

let server: http.Server;

beforeAll(async () => {
    server = await startTestServer();
});

afterAll(async () => {
    await models.User.destroy({truncate: true});
    await endTestSerer();
});

describe('Create user test', () => {
    it('Missing data (email/pass)', async () => {
        const response = await supertest(server).post('/singup');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing credentials');
    });

    it('User invalid password length', async () => {
        const response = await supertest(server)
            .post('/singup')
            .send({email: 'test', password: '12345'});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Password length must be between 6 and 12');
    });

    it('User ok', async () => {
        const response = await supertest(server)
            .post('/singup')
            .send({email: 'test', password: '123456'});

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('User already exists', async () => {
        const response = await supertest(server)
            .post('/singup')
            .send({email: 'test', password: '123456'});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User already exists');
    });
});

describe('Login', () => {
    const email = 'user';

    beforeAll(async () => {
        await models.User.create({
            email,
            password: '123456',
        });
    });

    it('Missing data (email/pass)', async () => {
        const response = await supertest(server).post('/login');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Missing credentials');
    });

    it('User not found', async () => {
        const response = await supertest(server)
            .post('/login')
            .send({email: 'not_found', password: '123456'});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('User not found');
    });

    it('User login ok', async () => {
        const response = await supertest(server)
            .post('/login')
            .send({email: 'user', password: '123456'});

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });
});
