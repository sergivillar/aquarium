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
        createdAt: String
    }

    extend type Mutation {
        addMeasure(
            temperature: Int
            salinity: Int
            nitrite: Int
            nitrate: Int
            phosphate: Int
            alkalinity: Int
            calcium: Int
            magnesium: Int
            silicate: Int
        ): Measure
    }
`;
