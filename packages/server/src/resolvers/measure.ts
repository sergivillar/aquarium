import models from '../models';
import {UserInstance} from '../models/user';
import {MeasureInstance} from '../models/measure';
import {AddMeasureMutationArgs} from '../typings/types';

export default {
    Mutation: {
        addMeasure: async (
            _: any,
            args: AddMeasureMutationArgs,
            {user}: {user: UserInstance}
        ): Promise<MeasureInstance> =>
            (await models.Measure.create({
                ...args,
                user_id: user.id,
            })) as MeasureInstance,
    },
};
