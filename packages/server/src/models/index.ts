import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';
// tslint:disable-next-line
const config = require(path.join(__dirname, '/../../dbconfig.ts'))[env];

const sequelize = new Sequelize(config);

const models = {
    User: sequelize.import('./user'),
    Aquarium: sequelize.import('./aquarium'),
    Measure: sequelize.import('./measure'),
};

export interface IModels {
    User: typeof models.User;
    Aquarium: typeof models.Aquarium;
    Measure: typeof models.Measure;
}

Object.values(models).forEach((model: any) => {
    if (model.associate) {
        model.associate(models);
    }
});

export {sequelize};

export default models;
