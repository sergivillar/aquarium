import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';
import models from './models';
import {UserInstance} from './models/user';
import {AquariumInstance} from './models/aquarium';

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

type Query {
    user(email: String): User
    aquariums: [Aquarium]
}

type Mutation {
    # A mutation to add a new user
    addAquarium(name: String!, liters: Int!): Aquarium!
}
`;

const resolvers = {
    Query: {
        // | any in args --> https://github.com/apollographql/graphql-tools/issues/704
        user: async (
            _: any,
            args: {email: string} | any,
            {user}: {user: UserInstance}
        ): Promise<UserInstance | null> => {
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
            {name, liters}: {name: string; liters: number} | any,
            {user}: {user: UserInstance}
        ): Promise<AquariumInstance> => {
            return (await models.Aquarium.create({name, liters, user_id: user.id})) as AquariumInstance;
        },
    },
};

const schema = makeExecutableSchema({typeDefs, resolvers});
// addMockFunctionsToSchema({schema});
export {schema};
