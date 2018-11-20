import path from 'path';
import Sequelize from 'sequelize';
import {UserInstance, IUserAttributes} from './user';
import {AquariumInstance, IAquariumAttributes} from './aquarium';
import {MeasureInstance, IMeasureAttributes} from './measure';

const env = process.env.NODE_ENV || 'development';
// tslint:disable-next-line
const config = require(path.join(__dirname, '/../../dbconfig.ts'))[env];

const sequelize = new Sequelize(config);

const models = {
    User: sequelize.import<UserInstance, IUserAttributes>('./user'),
    Aquarium: sequelize.import<AquariumInstance, IAquariumAttributes>('./aquarium'),
    Measure: sequelize.import<MeasureInstance, IMeasureAttributes>('./measure'),
};
export type Models = typeof models;

Object.values(models).forEach((model: any) => {
    if (model.associate) {
        model.associate(models);
    }
});

export {sequelize};

export default models;
