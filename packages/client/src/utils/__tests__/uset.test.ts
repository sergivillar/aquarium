import {isAuthenticated} from '../user';
import {getItem} from '../local-storage';
import jsonwebtoken from 'jsonwebtoken';

jest.mock('../local-storage', () => ({
    getItem: jest.fn(),
}));

describe('Tets user isAuthenticated', () => {
    it('empty local storge', async () => {
        (getItem as jest.Mock).mockImplementation(() => []);

        expect(isAuthenticated()).toBeFalsy();
    });

    it('token not expired', async () => {
        (getItem as jest.Mock).mockImplementation(() => ['test', 'token', 'refreshToken']);
        const tokenExpiresInOneMinute = +new Date() + 60000;

        const jwtDecode = jest.spyOn(jsonwebtoken, 'decode').mockImplementation(() => ({
            exp: Math.floor(tokenExpiresInOneMinute / 1000),
        }));

        expect(isAuthenticated()).toBeTruthy();
        expect(jwtDecode).toBeCalled();
    });

    it('token not expired but it is in expired threshold', async () => {
        (getItem as jest.Mock).mockImplementation(() => ['test', 'token', 'refreshToken']);
        const tokenExpiresByThreshold = +new Date() - 5000;

        const jwtDecode = jest.spyOn(jsonwebtoken, 'decode').mockImplementation(() => ({
            exp: Math.floor(tokenExpiresByThreshold / 1000),
        }));

        expect(isAuthenticated()).toBeFalsy();
        expect(jwtDecode).toBeCalled();
    });

    it('token expired', async () => {
        (getItem as jest.Mock).mockImplementation(() => ['test', 'token', 'refreshToken']);
        const tokenExpiredOneMinuteAgo = +new Date() - 60000;

        const jwtDecode = jest.spyOn(jsonwebtoken, 'decode').mockImplementation(() => ({
            exp: Math.floor(tokenExpiredOneMinuteAgo / 1000),
        }));

        expect(isAuthenticated()).toBeFalsy();
        expect(jwtDecode).toBeCalled();
    });
});

export default undefined;
