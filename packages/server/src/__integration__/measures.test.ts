import supertest from 'supertest';
import models from '../models';
import app from '../app';
import {sequelize} from '../models';
import {UserInstance, createToken} from '../models/user';
import {AquariumInstance} from '../models/aquarium';

let user: UserInstance;
let aquarium: AquariumInstance;
let token: string;

const getMeasureQuery = (variables?: {}) => ({
    query: `
        query ($aquariumId: ID!, $limit: Int, $cursor: String) {
            getMeasures(aquariumId: $aquariumId, limit: $limit, cursor: $cursor) {
                measures {
                    phosphate
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }`,
    variables,
});

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

const createUser = async (): Promise<any> =>
    models.User.create({
        email: 'email@test.com',
        password: '123456',
    });

const createAquarium = async (userId?: string): Promise<any> =>
    models.Aquarium.create({
        userId,
        name: 'Test',
        liters: 100,
    });

afterAll(async () => {
    await sequelize.close();
});

const createMeasure = async (
    aquariumId?: string,
    {phosphate, nitrate}: {phosphate?: number; nitrate?: number} = {}
): Promise<any> =>
    models.Measure.create({
        aquariumId,
        phosphate,
        nitrate,
    });

describe('Create measure to an aquarium', () => {
    beforeAll(async () => {
        user = await createUser();
        aquarium = await createAquarium(user.id);
        token = await createToken(user);
    });

    afterAll(async () => {
        await models.User.truncate({cascade: true});
        await models.Aquarium.truncate({cascade: true});
        await models.Measure.truncate({cascade: true});
    });

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

describe('Get measure of an aquarium', () => {
    beforeAll(async () => {
        user = await createUser();
        aquarium = await createAquarium(user.id);
        await createMeasure(aquarium.id, {phosphate: 10});
        await createMeasure(aquarium.id, {phosphate: 15});
        await createMeasure(aquarium.id, {phosphate: 20});
        token = await createToken(user);
    });

    afterAll(async () => {
        await models.User.truncate({cascade: true});
        await models.Aquarium.truncate({cascade: true});
        await models.Measure.truncate({cascade: true});
        await sequelize.close();
    });

    it('Measure pagination working', async () => {
        const expectResultFirstQuery = {
            data: {
                getMeasures: {
                    measures: [{phosphate: 20}, {phosphate: 15}],
                    pageInfo: {
                        hasNextPage: true,
                    },
                },
            },
        };

        const responseFirstQuery = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(getMeasureQuery({aquariumId: aquarium.id, limit: 2}));

        expect(responseFirstQuery.status).toBe(200);
        expect(responseFirstQuery.body).toMatchObject(expectResultFirstQuery);
        const nextCursor = responseFirstQuery.body.data.getMeasures.pageInfo.endCursor;

        const expectResultSecondQuery = {
            data: {
                getMeasures: {
                    measures: [{phosphate: 10}],
                    pageInfo: {
                        hasNextPage: false,
                    },
                },
            },
        };

        const responseSecondQuery = await supertest(app)
            .post('/graphql')
            .set('Authorization', 'Bearer ' + token)
            .send(getMeasureQuery({aquariumId: aquarium.id, limit: 2, cursor: nextCursor}));

        expect(responseSecondQuery.status).toBe(200);
        expect(responseSecondQuery.body).toMatchObject(expectResultSecondQuery);
    });
});
