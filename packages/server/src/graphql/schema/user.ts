import {gql} from 'apollo-server-express';

export default gql`
    type User {
        id: ID!
        email: String!
        aquariums: [Aquarium!]!
        createdAt: String
    }

    extend type Query {
        me(email: String): User!
    }
`;
