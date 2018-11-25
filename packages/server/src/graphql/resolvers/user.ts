import models from '../../models';
import {UserInstance} from '../../models/user';
import {IContext} from '../';

export default {
    Query: {
        me: async (_: any, __: any, {user}: IContext): Promise<UserInstance | null> => user,
    },
    User: {
        aquariums: ({id}: UserInstance) =>
            models.Aquarium.findAll({
                where: {userId: id},
            }),
    },
};
