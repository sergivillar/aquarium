import {gql} from 'apollo-server-express';
import userSchema from './user';
import aquariumSchema from './aquarium';
import measureSchema from './measure';

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

export default [linkSchema, userSchema, aquariumSchema, measureSchema];
