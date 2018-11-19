import {MeasureInstance} from '../../models/measure';
import {Models} from '../../models';

export const batchMeasures = async (keys: string[], models: Models) => {
    const measures = (await models.Measure.findAll({
        where: {
            aquariumId: keys,
        },
    })) as MeasureInstance[];

    return keys.map(key => measures.filter((measure: MeasureInstance) => measure.aquariumId === key));
};
