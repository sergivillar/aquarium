import supertest from 'supertest';
import models from '../models';
import app from '../../app';
import {UserInstance, createToken} from '../models/user';

let user: UserInstance;
let token: string;

const addAquariumMutation = (variables?: {}) => ({
    query: `
        mutation ($aquariumId: Int!, $liters: Int!) {
            addMeasure(aquariumId: $name, liters: $liters) {
                id
                liters
                aquarium {
                    id
                }
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

afterAll(async () => {
    await models.User.truncate({cascade: true});
    // await models.Aquarium.truncate({cascade: true});
    // await models.Measure.truncate({cascade: true});
});

describe('Create measure to an aquarium', () => {
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
});
