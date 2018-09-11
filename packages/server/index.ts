import express, {Request, Response} from 'express';
import passport from 'passport';
import {ApolloServer} from 'apollo-server-express';
import {schema} from './src/schema';
import db from './src/models';
import routes from './src/routes';
import APIerror from './src/errors';
require('./src/auth');

db.init();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/', routes);

const server = new ApolloServer({schema});
server.applyMiddleware({app});

app.use((error: APIerror, _tslint: Request, res: Response, next: Function) => {
    if (!error.code) error.code = 500;
    res.status(error.code).send(error.message);

    next(error);
});

app.listen({port: 4000}, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
