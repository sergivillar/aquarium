import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';
import {Document} from 'mongoose';
import models from './models';
import {UserInstance} from './models/user';

const typeDefs = `
type User {
    id: ID!
    email: String!
}

type Aquarium {
    id: ID!
    name: String
    owner: User
}

type Token {
    token: String!
}

type Query {
    user(email: String): User
    aquariums: [Aquarium]
}

type Mutation {
    # A mutation to add a new user
    signUp(email: String!, password: String!): Token!
}
`;

const resolvers = {
    Query: {
        // | any in args --> https://github.com/apollographql/graphql-tools/issues/704
        user: async (_: any, args: {email: string} | any): Promise<UserInstance | null> => {
            return (await models.User.findOne({
                where: {email: args.email},
            })) as UserInstance;
        },
    },
    Mutation: {
        signUp: async (
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
