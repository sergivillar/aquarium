import {gql} from 'apollo-server-express';

export default gql`
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
        aquarium: Aquarium!
        createdAt: String
    }

    extend type Query {
        getMeasures(id: ID!): [Measure]!
    }

    extend type Mutation {
        createMeasure(
            temperature: Int
            salinity: Int
            nitrite: Int
            nitrate: Int
            phosphate: Int
            alkalinity: Int
            calcium: Int
            magnesium: Int
            silicate: Int
            aquariumId: ID!
        ): Measure!
    }
`;
