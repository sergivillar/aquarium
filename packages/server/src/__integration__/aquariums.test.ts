import supertest from 'supertest';
import models from '../models';
import app from '..';
import {UserInstance, createToken} from '../models/user';
import {sequelize} from '../models';

let user: UserInstance;
let token: string;

const createAquariumMutation = (variables?: {}) => ({
    query: `
        mutation ($name: String!, $liters: Int!) {
            createAquarium(name: $name, liters: $liters) {
                id
                name
                liters
                user {
                    id
                }
            }
        }`,
    variables,
});

beforeAll(async () => {
    user = (await models.User.create({
        email: 'email2@test.com',
        password: '123456',
    })) as UserInstance;
    token = await createToken(user);
});

afterAll(async () => {
    await models.User.truncate({cascade: true});
    await models.Aquarium.truncate({cascade: true});
    await sequelize.close();
});

describe('Create aquarium to a user', () => {
    it('Unauthenticated user', async () => {
        const expectResult = {
            message: 'No auth token',
        };

        const response = await supertest(app)
            .post('/graphql')
            .send(createAquariumMutation());

        expect(response.status).toBe(401);
        expect(response.body).toMatchObject(expectResult);
    });

    it('Name and liters ok', async () => {
        const name = 'aquarium';
        const liters = 100;

        const expectResult = {
            data: {createAquarium: {name, liters, user: {id: user.id}}},
        };

        const response = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(createAquariumMutation({name, liters}));

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectResult);
    });

    it('No name', async () => {
        const response = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(createAquariumMutation({name: null, liters: 100}));

        expect(response.status).toBe(400);
    });
});
