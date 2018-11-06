import * as Sequelize from 'sequelize';

export interface IMeasureAttributes {
    id?: string;
    temperature: number;
    salinity: number;
    nitrite: number;
    nitrate: number;
    phosphate: number;
    alkalinity: number;
    calcium: number;
    magnesium: number;
    silicate: number;
    createdAt?: string;
    updatedAt?: string;
    aquariumId?: string;
}

export type MeasureInstance = Sequelize.Instance<IMeasureAttributes> & IMeasureAttributes;

const measure = (sequelize: Sequelize.Sequelize) => {
    const attributes = {
        id: {type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4},
        liters: {type: Sequelize.INTEGER},
        temperature: {type: Sequelize.FLOAT},
        salinity: {type: Sequelize.FLOAT},
        nitrite: {type: Sequelize.FLOAT},
        nitrate: {type: Sequelize.FLOAT},
        phosphate: {type: Sequelize.FLOAT},
        alkalinity: {type: Sequelize.FLOAT},
        calcium: {type: Sequelize.FLOAT},
        magnesium: {type: Sequelize.FLOAT},
        silicate: {type: Sequelize.FLOAT},
    };

    const Measure = sequelize.define<MeasureInstance, IMeasureAttributes>('measures', attributes, {
        freezeTableName: true,
    });

    Measure.associate = (models: any) => {
        Measure.belongsTo(models.Aquarium, {foreignKey: 'aquariumId'});
    };

    return Measure;
};

export default measure;
