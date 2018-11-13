import models from '../../models';
import {UserInstance} from '../../models/user';
import {MeasureInstance} from '../../models/measure';
import {CreateMeasureMutationArgs, GetMeasuresQueryArgs} from '../../typings/generated';

export default {
    Query: {
        getMeasures: async (
            _: any,
            {id}: GetMeasuresQueryArgs | any,
            {user}: {user: UserInstance}
        ): Promise<MeasureInstance[]> =>
            (await models.Measure.findAll({where: {aquariumId: id, userId: user.id}})) as MeasureInstance[],
    },
    Mutation: {
        createMeasure: async (_: any, args: CreateMeasureMutationArgs | any): Promise<MeasureInstance> =>
            (await models.Measure.create(args)) as MeasureInstance,
    },
    Measure: {
        aquarium: (measure: MeasureInstance) => models.Aquarium.findById(measure.aquariumId),
    },
};
