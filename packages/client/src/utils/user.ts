import jsonwebtoken from 'jsonwebtoken';
import {getItem} from './local-storage';

export const isAuthenticated = () => {
    const [email, token, refreshToken] = getItem(['email', 'token', 'refreshToken']) as string[];

    if (!email || !token || !refreshToken) {
        return false;
    }

    const data = jsonwebtoken.decode(token);
    console.log(data);
};
