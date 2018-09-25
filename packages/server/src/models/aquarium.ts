import * as Sequelize from 'sequelize';

export interface IAquariumAttributes {
    id?: string;
    name: string;
    liters: number;
    createdAt?: string;
    updatedAt?: string;
}

export type AquariumInstance = Sequelize.Instance<IAquariumAttributes> & IAquariumAttributes;

const user = (sequelize: Sequelize.Sequelize) => {
    const attributes = {
        id: {type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4},
        name: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
        liters: {type: Sequelize.NUMBER},
    };

    const Aquarium = sequelize.define<AquariumInstance, IAquariumAttributes>('aquarium', attributes);

    Aquarium.associate = (models: any) => {
        Aquarium.belongsTo(models.User, {foreignKey: 'user_id'});
    };

    return Aquarium;
};

export default user;
