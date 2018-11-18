import {MeasureInstance} from '../../models/measure';
import {IModels} from '../../models';

export const batchMeasures = async (keys: string[], models: IModels) => {
    const measures = (await models.Measure.findAll({
        where: {
            aquariumId: keys,
        },
    })) as MeasureInstance[];

    return keys.map(key => measures.filter((measure: MeasureInstance) => measure.aquariumId === key));
};
