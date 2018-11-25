import {makeExecutableSchema} from 'apollo-server-express';
import DataLoader from 'dataloader';
import typeDefs from './schema';
import resolvers from './resolvers';
import {UserInstance} from '../models/user';

export interface IContext {
    user: UserInstance;
    loaders: {[_: string]: DataLoader<string, any>};
}

export default makeExecutableSchema({typeDefs, resolvers});
