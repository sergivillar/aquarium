import Sequelize from 'sequelize';
import models from '../../models';
import {MeasureInstance} from '../../models/measure';
import {CreateMeasureMutationArgs, GetMeasuresQueryArgs, PageInfo} from '../../types';

const toCursorHash = (value: string) => Buffer.from(value).toString('base64');
const fromCursorHash = (value: string) => Buffer.from(value, 'base64').toString('ascii');

export default {
    Query: {
        getMeasures: async (
            _: any,
            {aquariumId, cursor, limit = 5}: GetMeasuresQueryArgs | any
        ): Promise<{measures: MeasureInstance[]; pageInfo: PageInfo}> => {
            const measures = await models.Measure.findAll({
                order: [['createdAt', 'DESC']],
                limit: limit + 1,
                where: {
                    aquariumId,
                    ...(cursor && {createdAt: {[Sequelize.Op.lt]: fromCursorHash(cursor)}}),
                },
            });

            const hasNextPage = measures.length > limit;
            const result = hasNextPage ? measures.slice(0, -1) : measures;

            if (result.length === 0) {
                return {measures: [], pageInfo: {hasNextPage: false}};
            }

            const nextTimestamp = hasNextPage && result[result.length - 1].createdAt;

            return {
                measures: result,
                pageInfo: {
                    hasNextPage,
                    ...(nextTimestamp && {endCursor: toCursorHash(new Date(nextTimestamp).toISOString())}),
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
