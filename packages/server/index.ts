import express, {Request, Response} from 'express';
import http from 'http';
import passport from 'passport';
import {ApolloServer} from 'apollo-server-express';
import {schema} from './src/schema';
import routes from './src/routes';
import {errorMiddleware} from './src/utils/middleware';
import {sequelize} from './src/models';

require('./src/auth');

const app = express();
let server: http.Server;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/', routes);

const apolloServer = new ApolloServer({schema});
apolloServer.applyMiddleware({app});

app.use(errorMiddleware);

// TODO: only force if dev mode, create mock data
sequelize.sync({force: true}).then(() => {
    server = app.listen({port: 4000}, () => {
        console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
    });
});

export {server};
export default app;
