import models from '../../models';
import {UserInstance} from '../../models/user';
import {AquariumInstance} from '../../models/aquarium';
import {CreateAquariumMutationArgs, AquariumQueryArgs} from '../../typings/generated';
import {IContext} from '../';

export default {
    Query: {
        aquarium: (_: any, {id}: AquariumQueryArgs | any) => models.Aquarium.findById(id),
    },
    Mutation: {
        createAquarium: async (
            _: any,
            // https://github.com/apollographql/graphql-tools/issues/704
            {name, liters}: CreateAquariumMutationArgs | any,
            {user}: {user: UserInstance}
        ): Promise<AquariumInstance> => {
            if (!name) {
                throw new Error('Aquarium name can not be empty.');
            }

            return (await models.Aquarium.create({name, liters, userId: user.id})) as AquariumInstance;
        },
    },
    Aquarium: {
        user: (aquarium: AquariumInstance) => models.User.findById(aquarium.userId),
        measures: (aquarium: AquariumInstance, _: any, {loaders}: IContext) =>
            // @ts-ignore aquarium.id is always defined
            loaders.measure.load(aquarium.id),
    },
};
