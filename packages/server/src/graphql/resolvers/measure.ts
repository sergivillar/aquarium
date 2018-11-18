import Sequelize from 'sequelize';
import models from '../../models';
import {MeasureInstance} from '../../models/measure';
import {CreateMeasureMutationArgs, GetMeasuresQueryArgs} from '../../typings/generated';

import {MeasurePaginated, Measure} from '../../typings/generated';

export default {
    Query: {
        getMeasures: async (
            _: any,
            {aquariumId, cursor, limit = 5}: GetMeasuresQueryArgs | any
        ): Promise<MeasurePaginated> => {
            const measures = (await models.Measure.findAll({
                order: [['createdAt', 'DESC']],
                limit: limit + 1,
                where: {
                    aquariumId,
                    ...(cursor && {createdAt: {[Sequelize.Op.lt]: cursor}}),
                },
            })) as Measure[];

            const hasNextPage = measures.length > limit;
            const result = hasNextPage ? measures.slice(0, -1) : measures;
            const nextTimestamp = result[result.length - 1].createdAt;

            return {
                measures: result,
                pageInfo: {
                    hasNextPage,
                    endCursor: nextTimestamp && new Date(nextTimestamp).toISOString(),
                },
            };
        },
    },
    Mutation: {
        createMeasure: async (_: any, args: CreateMeasureMutationArgs | any): Promise<MeasureInstance> =>
            (await models.Measure.create(args)) as MeasureInstance,
    },
    Measure: {
        aquarium: (measure: MeasureInstance) => models.Aquarium.findById(measure.aquariumId),
    },
};
