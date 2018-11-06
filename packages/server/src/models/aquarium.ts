import * as Sequelize from 'sequelize';

export interface IAquariumAttributes {
    id?: string;
    name: string;
    liters: number;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type AquariumInstance = Sequelize.Instance<IAquariumAttributes> & IAquariumAttributes;

const aquarium = (sequelize: Sequelize.Sequelize) => {
    const attributes = {
        id: {type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4},
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        liters: {type: Sequelize.INTEGER},
    };

    const Aquarium = sequelize.define<AquariumInstance, IAquariumAttributes>('aquariums', attributes, {
        freezeTableName: true,
    });

    Aquarium.associate = (models: any) => {
        Aquarium.belongsTo(models.User, {foreignKey: 'userId'});
        Aquarium.hasMany(models.Measure, {foreignKey: 'aquariumId'});
    };

    return Aquarium;
};

export default aquarium;
