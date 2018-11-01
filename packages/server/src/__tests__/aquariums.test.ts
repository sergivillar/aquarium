import supertest from 'supertest';
import models from '../models';
import app from '../../app';
import {UserInstance, createToken} from '../models/user';

let user: UserInstance;
let token: string;

const addAquariumMutation = (variables?: {}) => ({
    query: `
        mutation ($name: String!, $liters: Int!) {
            addAquarium(name: $name, liters: $liters) {
                id
                name
                liters
                user_id
            }
        }`,
    variables,
});

beforeAll(async () => {
    user = (await models.User.create({
        email: 'email@test.com',
        password: '123456',
    })) as UserInstance;
    token = await createToken(user);
});

describe('Create aquarium to a user', () => {
    it('Unauthenticated user', async () => {
        const expectResult = {
            message: 'No auth token',
        };

        const response = await supertest(app)
            .post('/graphql')
            .send(addAquariumMutation());

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject(expectResult);
    });

    it('Name and liters ok', async () => {
        const name = 'test';
        const liters = 100;

        const expectResult = {
            data: {addAquarium: {name, liters, user_id: user.id}},
        };

        const response = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(addAquariumMutation({name, liters}));

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectResult);
    });

    it('No name', async () => {
        const response = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(addAquariumMutation({name: null, liters: 100}));

        expect(response.status).toBe(400);
    });

    it('Can not create two aquariums same name same user', async () => {
        const name = 'test_aquarium';
        const liters = 100;

        const expectResult = {
            data: {addAquarium: {name, liters, user_id: user.id}},
        };

        const response = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(addAquariumMutation({name, liters}));

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectResult);

        const response2 = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(addAquariumMutation({name, liters}));

        expect(response2.status).toBe(200);
        expect(response2.body).toMatchObject(expectResult);
    });
});
