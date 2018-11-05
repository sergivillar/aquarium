import models from '../models';
import {UserInstance} from '../models/user';
import {AquariumInstance} from '../models/aquarium';
import {AddAquariumMutationArgs} from '../typings/generated';

export default {
    Mutation: {
        addAquarium: async (
            _: any,
            // https://github.com/apollographql/graphql-tools/issues/704
            {name, liters}: AddAquariumMutationArgs | any,
            {user}: {user: UserInstance}
        ): Promise<AquariumInstance> =>
            (await models.Aquarium.create({name, liters, user_id: user.id})) as AquariumInstance,
    },
    Aquarium: {
        user: async (aquarium: AquariumInstance) => await models.User.findById(aquarium.user_id),
    },
};
