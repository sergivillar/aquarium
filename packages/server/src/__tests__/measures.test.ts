import supertest from 'supertest';
import models from '../models';
import app from '..';
import {sequelize} from '../models';
import {UserInstance, createToken} from '../models/user';
import {AquariumInstance} from '../models/aquarium';

let user: UserInstance;
let aquarium: AquariumInstance;
let token: string;

const createMeasureMutation = (variables?: {}) => ({
    query: `
        mutation ($aquariumId: ID!, $phosphate: Int!) {
            createMeasure(aquariumId: $aquariumId, phosphate: $phosphate) {
                phosphate
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
    aquarium = (await models.Aquarium.create({
        userId: user.id,
        name: 'Test',
        liters: 100,
    })) as AquariumInstance;
    token = await createToken(user);
});

afterAll(async () => {
    await models.User.truncate({cascade: true});
    await models.Aquarium.truncate({cascade: true});
    await models.Measure.truncate({cascade: true});
    await sequelize.close();
});

describe('Create measure to an aquarium', () => {
    it('Measure create ok', async () => {
        const expectPhospate = 10;
        const expectResult = {
            data: {
                createMeasure: {
                    phosphate: expectPhospate,
                    aquarium: {
                        id: aquarium.id,
                    },
                },
            },
        };

        const response = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(createMeasureMutation({aquariumId: aquarium.id, phosphate: expectPhospate}));

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectResult);
    });
});
