import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'password', {
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op as any,
});

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
