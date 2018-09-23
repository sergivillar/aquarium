import Sequelize from 'sequelize';

module.exports = {
    development: {
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        host: '127.0.0.1',
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
    },
    test: {
        username: 'postgres',
        password: 'password',
        database: 'test',
        host: '127.0.0.1',
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
        logging: false,
    },
};
