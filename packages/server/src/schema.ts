import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';
import models from './models';
import {UserInstance} from './models/user';

const typeDefs = `
type User {
    id: ID!
    email: String!
    createdAt: String
}

type Aquarium {
    id: ID!
    name: String!
    liters: Int!
    user_id: User!
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
    Mutation: {
        addAquarium: async (
            _: any,
            {email, password}: {email: string; password: string} | any
        ): Promise<UserInstance> => {
            return (await models.User.create({email, password})) as UserInstance;
        },
    },
};

const schema = makeExecutableSchema({typeDefs, resolvers});
// addMockFunctionsToSchema({schema});
export {schema};
