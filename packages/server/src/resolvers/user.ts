import models from '../models';
import {UserInstance} from '../models/user';

export default {
    Query: {
        me: async (_: any, __: any, {user}: {user: UserInstance}): Promise<UserInstance | null> => user,
    },
    User: {
        aquariums: async ({id}: UserInstance) =>
            await models.Aquarium.findAll({
                where: {userId: id},
            }),
    },
};
