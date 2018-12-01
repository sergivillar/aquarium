// @ts-ignore
// tslint:disable-next-line
const Sequelize = require('sequelize');

// @ts-ignore
module.exports = {
    development: {
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
    },
    test: {
        username: 'postgres',
        password: 'password',
        database: 'test',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
        logging: false,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
        logging: false,
    },
};
