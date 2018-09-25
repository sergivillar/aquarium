import http from 'http';
import express from 'express';
import {errorMiddleware} from '../utils/middleware';
import {sequelize} from '../models';
import passport from 'passport';
import routes from '../routes';

let server: http.Server;

const startTestServer = async () => {
    require('dotenv').config();
    require('../auth');

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(passport.initialize());

    app.use('/', routes);
    app.use(errorMiddleware);

    await sequelize.authenticate();
    await sequelize.sync({force: true});

    server = await app.listen({port: 4000});
    return server;
};

const endTestSerer = async () => {
    await sequelize.close();
    await server.close();
};

export {startTestServer, endTestSerer};
