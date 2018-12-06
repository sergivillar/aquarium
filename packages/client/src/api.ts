import {addResponseInterceptor, cleanInterceptors} from './utils/fetch';
import {getItem} from './utils/local-storage';

const API_URL = 'http://localhost:3000/';

const tokenRefreshInterceptor = () =>
    addResponseInterceptor(async response => {
        const data = await response.json();

        if (response.status === 401 && data.message === 'jwt expired') {
            // TODO move to secure cookie
            const [email, refreshToken] = getItem(['email', 'refreshToken']) as string[];

            if (!email || !refreshToken) {
                window.location.href = '/login';
                return;
            }

            const responseRefreshToken = await api.refreshToken(email, refreshToken);

            if (response.status === 401) {
                window.location.href = '/login';
            }
            console.log(responseRefreshToken);
        }
    });

const login = (email: string, password: string) =>
    fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    }).then(res => res.json());

const token = (email: string, refreshToken: string) =>
    fetch(API_URL + 'token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, refreshToken}),
    }).then(res => res.json());

const api = {
    login: (email: string, password: string) => {
        cleanInterceptors();
        return login(email, password);
    },
    refreshToken: (email: string, refreshToken: string) => {
        cleanInterceptors();
        return token(email, refreshToken);
    },
    grapqhl: () => {
        tokenRefreshInterceptor();
    },
};

export default api;
