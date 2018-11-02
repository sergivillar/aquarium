import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';
import models from './models';
import {UserInstance} from './models/user';
import {AquariumInstance} from './models/aquarium';
import {MeasureInstance} from './models/measure';

const typeDefs = `
type User {
    id: ID!
    email: String!
    aquariums : [Aquarium]
    createdAt: String
}

type Aquarium {
    id: ID!
    name: String!
    liters: Int!
    user_id: ID!
    createdAt: String
}

type Measure {
    id: ID!
    temperature: Int!
    salinity: Int!
    nitrite: Int!
    nitrate: Int!
    phosphate: Int!
    alkalinity: Int!
    calcium: Int!
    magnesium: Int!
    silicate: Int!
    createdAt: String
}

type Query {
    me(email: String): User
    aquariums: [Aquarium]
}

type Mutation {
    addAquarium(name: String!, liters: Int!): Aquarium
    addMeasure(
        temperature: Int,
        salinity: Int,
        nitrite: Int,
        nitrate: Int,
        phosphate: Int,
        alkalinity: Int,
        calcium: Int,
        magnesium: Int,
        silicate: Int
    ): Measure
}
`;

const resolvers = {
    Query: {
        me: async (_: any, __: any, {user}: {user: UserInstance}): Promise<UserInstance | null> => {
            return user;
        },
    },
    User: {
        aquariums: (user: UserInstance) =>
            models.Aquarium.findAll({
                where: {
                    user_id: user.id,
                },
            }),
    },
    Mutation: {
        addAquarium: async (
            _: any,
            // | any in args --> https://github.com/apollographql/graphql-tools/issues/704
            {name, liters}: {name: string; liters: number},
            {user}: {user: UserInstance}
        ): Promise<AquariumInstance> =>
            (await models.Aquarium.create({name, liters, user_id: user.id})) as AquariumInstance,
        addMeasure: async (
            _: any,
            args: {
                temperature: number;
                salinity: number;
                nitrite: number;
                nitrate: number;
                phosphate: number;
                alkalinity: number;
                calcium: number;
                magnesium: number;
                silicate: number;
            },
            {user}: {user: UserInstance}
        ): Promise<MeasureInstance> => {
            const {
                temperature,
                salinity,
                nitrite,
                nitrate,
                phosphate,
                alkalinity,
                calcium,
                magnesium,
                silicate,
            } = args;

            return (await models.Measure.create({
                temperature,
                salinity,
                nitrite,
                nitrate,
                phosphate,
                alkalinity,
                calcium,
                magnesium,
                silicate,
                user_id: user.id,
            })) as MeasureInstance;
        },
    },
};

const schema = makeExecutableSchema({typeDefs, resolvers});
// addMockFunctionsToSchema({schema});
export {schema};
