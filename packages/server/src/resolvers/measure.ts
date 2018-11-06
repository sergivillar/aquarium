import models from '../models';
import {UserInstance} from '../models/user';
import {MeasureInstance} from '../models/measure';
import {AddMeasureMutationArgs, GetMeasuresQueryArgs} from '../typings/generated';

export default {
    Query: {
        getMeasures: async (
            _: any,
            {id}: GetMeasuresQueryArgs | any,
            {user}: {user: UserInstance}
        ): Promise<MeasureInstance[]> =>
            (await models.Measure.findAll({where: {aquarium_id: id, user_id: user.id}})) as MeasureInstance[],
    },
    Mutation: {
        addMeasure: async (_: any, args: AddMeasureMutationArgs | any): Promise<MeasureInstance> =>
            (await models.Measure.create({
                ...args,
                aquarium_id: args.aquariumId,
            })) as MeasureInstance,
    },
    Measure: {
        aquarium: (measure: MeasureInstance) => {
            models.Aquarium.findById(measure.aquarium_id);
        },
    },
};
