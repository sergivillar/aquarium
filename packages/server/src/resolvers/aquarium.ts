import models from '../models';
import {UserInstance} from '../models/user';
import {AquariumInstance} from '../models/aquarium';

export default {
    Mutation: {
        addAquarium: async (
            _: any,
            {name, liters}: {name: string; liters: number} | any,
            {user}: {user: UserInstance}
        ): Promise<AquariumInstance> =>
            (await models.Aquarium.create({name, liters, user_id: user.id})) as AquariumInstance,
    },
};
