import express, {Request} from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import DataLoader from 'dataloader';
import {ApolloServer, ApolloError} from 'apollo-server-express';
import schema from './graphql';
import routes from './routes';
import {errorMiddleware} from './utils/middleware';
import loaders from './graphql/loaders';
import models from './models';
import {MeasureInstance} from './models/measure';
import {IContext} from './graphql';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// tslint:disable-next-line
require('./auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use('/', routes);

const apolloServer = new ApolloServer({
    schema,
    context: ({req}: {req: Request}): IContext => ({
        user: req.user,
        loaders: {
            measure: new DataLoader<string, MeasureInstance[]>(keys =>
                loaders.measure.batchMeasures(keys, models)
            ),
        },
    }),
    formatError: (error: ApolloError) => {
        if (process.env.NODE_ENV === 'production') {
            delete error.extensions.exception;
        }
        return error;
    },
});

apolloServer.applyMiddleware({app});
app.use(errorMiddleware);

export default app;
