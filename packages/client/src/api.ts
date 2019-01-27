import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {onError} from 'apollo-link-error';
import fetchInterpector, {addResponseInterceptor} from './utils/fetch';
import {getItem, setItem, removeItem} from './utils/local-storage';

const API_URL = 'http://localhost:3000/';

// Overwrite fetch in order to use interceptor
window.fetch = fetchInterpector;

export const tokenRefreshInterceptor = () =>
    addResponseInterceptor(async originalResponse => {
        const response = originalResponse.clone();

        if (response.status === 401) {
            const data = await response.json();

            if (data.message === 'jwt expired') {
                const [email, refreshToken] = getItem(['email', 'refreshToken']) as string[];

                if (email && refreshToken) {
                    await api.refreshToken(email, refreshToken);
                }
            }
        }

        return originalResponse;
    });

const login = (email: string, password: string) =>
    fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

const singUp = (email: string, password: string) =>
    fetch(API_URL + 'singup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

const token = async (email: string, refreshToken: string) => {
    const response = await fetch(API_URL + 'token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, refreshToken}),
    });

    if (response.status !== 201) {
        removeItem(['email', 'token', 'refreshToken']);
    } else {
        const data = await response.json();
        setItem({token: data.token});
    }
};

const httpLink = new HttpLink({uri: API_URL + 'graphql', credentials: 'same-origin'});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: 'Bearer ' + getItem('token'),
        },
    });

    if (forward) {
        return forward(operation);
    }

    return null;
});

const onErrorMiddleware = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
        graphQLErrors.map(({message, locations, path}) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, onErrorMiddleware, httpLink]),
    cache: new InMemoryCache(),
});

const api = {
    login: (email: string, password: string) => login(email, password),
    singUp: (email: string, password: string) => singUp(email, password),
    refreshToken: (email: string, refreshToken: string) => token(email, refreshToken),
    grapqhl: client,
};

export {client};

export default api;
