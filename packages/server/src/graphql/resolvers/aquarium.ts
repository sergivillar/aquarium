import models from '../../models';
import {UserInstance} from '../../models/user';
import {AquariumInstance} from '../../models/aquarium';
import {CreateAquariumMutationArgs, AquariumQueryArgs} from '../../typings/generated';

export default {
    Query: {
        aquarium: (_: any, {id}: AquariumQueryArgs | any) => models.Aquarium.findById(id),
    },
    Mutation: {
        createAquarium: (
            _: any,
            // https://github.com/apollographql/graphql-tools/issues/704
            {name, liters}: CreateAquariumMutationArgs | any,
            {user}: {user: UserInstance}
        ): AquariumInstance => {
            // @ts-ignore https://github.com/Microsoft/TypeScript/issues/28067
            return models.Aquarium.create({name, liters, userId: user.id}) as AquariumInstance;
        },
    },
    Aquarium: {
        user: (aquarium: AquariumInstance) => models.User.findById(aquarium.userId),
        // TODO: Maybe I can create a Context interface to get all types from there
        measures: (aquarium: AquariumInstance, _: any, {loaders}: any) => loaders.measure.load(aquarium.id),
    },
};
