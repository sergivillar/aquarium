import models from '../models';
import {UserInstance} from '../models/user';
import {MeasureInstance} from '../models/measure';

export default {
    Mutation: {
        addMeasure: async (
            _: any,
            args:
                | {
                      temperature: number;
                      salinity: number;
                      nitrite: number;
                      nitrate: number;
                      phosphate: number;
                      alkalinity: number;
                      calcium: number;
                      magnesium: number;
                      silicate: number;
                  }
                | any,
            {user}: {user: UserInstance}
        ): Promise<MeasureInstance> => {
            const {
                temperature,
                salinity,
                nitrite,
                nitrate,
                phosphate,
                alkalinity,
                calcium,
                magnesium,
                silicate,
            } = args;

            return (await models.Measure.create({
                temperature,
                salinity,
                nitrite,
                nitrate,
                phosphate,
                alkalinity,
                calcium,
                magnesium,
                silicate,
                user_id: user.id,
            })) as MeasureInstance;
        },
    },
};
