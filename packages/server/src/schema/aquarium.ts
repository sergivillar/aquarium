import {gql} from 'apollo-server-express';

export default gql`
    type Aquarium {
        id: ID!
        name: String!
        liters: Int!
        user_id: ID!
        createdAt: String
    }

    extend type Query {
        aquariums: [Aquarium]
    }

    extend type Mutation {
        addAquarium(name: String!, liters: Int!): Aquarium
    }
`;
