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

    type PageInfo {
        hasNextPage: Boolean!
        endCursor: String
    }

    type MeasurePaginated {
        measures: [Measure]!
        pageInfo: PageInfo!
    }

    extend type Query {
        getMeasures(aquariumId: ID!, cursor: String, limit: Int): MeasurePaginated!
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
