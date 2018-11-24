import resolver from '../aquarium';
import models from '../../../models';
import {UserInstance} from '../../../models/user';
import {AquariumInstance} from '../../../models/aquarium';

describe('Test aquarium resolver', () => {
    it('Create ok', async () => {
        const user = {} as UserInstance;
        const aquarium = {name: 'Test', liters: 100};

        const spy = jest
            .spyOn(models.Aquarium, 'create')
            .mockImplementation(() => aquarium as AquariumInstance);

        const respose = await resolver.Mutation.createAquarium(undefined, aquarium, {user});

        expect(spy).toHaveBeenCalled();
        expect(respose).toMatchObject(aquarium);

        spy.mockRestore();
    });

    it('Create empty name', () => {
        const user = {} as UserInstance;
        const aquarium = {name: '', liters: 100};

        const spy = jest.spyOn(models.Aquarium, 'create').mockImplementation(() => null);

        const createAquarium = resolver.Mutation.createAquarium(undefined, aquarium, {user});

        expect(createAquarium).rejects.toThrow();
        expect(spy).not.toHaveBeenCalled();

        spy.mockRestore();
    });
});
