import * as Sequelize from 'sequelize';

export interface IAquariumAttributes {
    id?: string;
    name: string;
    liters: number;
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

    // @ts-ignore
    const Aquarium = sequelize.define<AquariumInstance, IAquariumAttributes>('aquariums', attributes, {
        freezeTableName: true,
    });

    Aquarium.associate = (models: any) => {
        Aquarium.belongsTo(models.User, {foreignKey: 'user_id'});
    };

    return Aquarium;
};

export default aquarium;
