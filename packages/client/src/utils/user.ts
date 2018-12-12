import jsonwebtoken from 'jsonwebtoken';
import {getItem} from './local-storage';

const THRESHOLD_REFRESH_TOKEN_SECONDS = 10;

export const isAuthenticated = (): boolean => {
    const [email, token, refreshToken] = getItem(['email', 'token', 'refreshToken']) as string[];

    if (!email || !token || !refreshToken) {
        return false;
    }

    const data = jsonwebtoken.decode(token);

    if (!data || typeof data !== 'object' || !data.exp) {
        return false;
    }

    return (data.exp - THRESHOLD_REFRESH_TOKEN_SECONDS) * 1000 > +new Date();
};
