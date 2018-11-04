import models from '../models';
import {UserInstance} from '../models/user';

export default {
    Query: {
        me: async (_: any, __: any, {user}: {user: UserInstance}): Promise<UserInstance | null> => user,
    },
    User: {
        aquariums: ({id}: UserInstance) =>
            models.Aquarium.findAll({
                where: {user_id: id},
            }),
    },
};
