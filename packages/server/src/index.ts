import express, {Request} from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import {ApolloServer} from 'apollo-server-express';
import schema from './graphql';
import routes from './routes';
import {errorMiddleware} from './utils/middleware';

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
    context: ({req}: {req: Request}) => ({
        user: req.user,
    }),
});

apolloServer.applyMiddleware({app});
app.use(errorMiddleware);

export default app;
