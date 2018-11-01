import express, {Request} from 'express';
import http from 'http';
import dotenv from 'dotenv';
import passport from 'passport';
import {ApolloServer} from 'apollo-server-express';
import {schema} from './src/schema';
import routes from './src/routes';
import {errorMiddleware} from './src/utils/middleware';
import {sequelize} from './src/models';
import APIError from './src/errors';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// tslint:disable-next-line
require('./src/auth');

const app = express();
let server: http.Server;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/', routes);

app.post('/graphql', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err || info) {
            return next(new APIError(err || info.message || info, 401));
        }

        if (!user) {
            return next(new APIError('JWT not related to any user', 401));
        }

        if (user) {
            req.user = user;
        }

        next();
    })(req, res, next);
});

const apolloServer = new ApolloServer({
    schema,
    context: ({req}: {req: Request}) => ({
        user: req.user,
    }),
});
apolloServer.applyMiddleware({app});

app.use(errorMiddleware);

// TODO: only force if dev mode
sequelize.sync({force: false}).then(() => {
    server = app.listen({port: 4000}, () => {
        // tslint:disable-next-line
        console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
    });
});

export {server};
export default app;
