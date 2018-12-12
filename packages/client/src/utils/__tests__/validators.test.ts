import {validateEmail} from '../validators';

describe('Tets validators', () => {
    it('invalid emails', async () => {
        expect(validateEmail('123')).toBeFalsy();
        expect(validateEmail('invalid')).toBeFalsy();
        expect(validateEmail('invalid@test')).toBeFalsy();
        expect(validateEmail('invalid@test.')).toBeFalsy();
        expect(validateEmail('invalid@test.c')).toBeFalsy();
    });

    it('valid emails', async () => {
        expect(validateEmail('valid@test.es')).toBeTruthy();
        expect(validateEmail('valid@test.com')).toBeTruthy();
    });
});
