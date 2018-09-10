import express from 'express';
import passport from 'passport';
import {ApolloServer} from 'apollo-server-express';
import {schema} from './src/schema';
import db from './src/models';
import routes from './src/routes';
require('./src/auth');

const PORT = 3000;

db.init();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/', routes);

const server = new ApolloServer({schema});
server.applyMiddleware({app});

app.listen({port: 4000}, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
