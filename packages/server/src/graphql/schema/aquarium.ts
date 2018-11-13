import {gql} from 'apollo-server-express';

export default gql`
    type Aquarium {
        id: ID!
        name: String!
        liters: Int!
        user: User!
        measures: [Measure!]
        createdAt: String
    }

    extend type Query {
        aquarium(id: ID!): Aquarium!
    }

    extend type Mutation {
        addAquarium(name: String!, liters: Int!): Aquarium
    }
`;
