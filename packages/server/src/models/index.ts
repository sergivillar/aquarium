import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../../dbconfig.js'))[env];

const sequelize = new Sequelize(config);

const models = {
    User: sequelize.import('./user'),
};

Object.values(models).forEach((model: any) => {
    if (model.associate) {
        model.associate(models);
    }
});

export {sequelize};

export default models;
