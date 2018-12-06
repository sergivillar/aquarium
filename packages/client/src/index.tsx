import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import App from './App';
import api, {tokenRefreshInterceptor} from './api';
import {getItem, setItem, removeItem} from './utils/local-storage';

const renderApp = (Main: any) => {
    ReactDOM.render(<Main />, document.getElementById('root'));
};

const checkAuth = () =>
    api.grapqhl.query({
        query: gql`
            {
                me {
                    email
                }
            }
        `,
    });

(async () => {
    const [email, token, refreshToken] = getItem(['email', 'token', 'refreshToken']) as string[];

    if (!email || !token || !refreshToken) {
        return renderApp(App);
    }

    try {
        await checkAuth();
    } catch (error) {
        const {
            result: {message},
            statusCode,
        } = error.networkError;

        if (statusCode === 401 && message === 'jwt expired') {
            await api.refreshToken(email, refreshToken);
        } else {
            // If some error during getting auth or refreshing token delete all auth related data
            removeItem(['email', 'token', 'refreshToken']);
        }
    }

    tokenRefreshInterceptor();

    renderApp(App);
})();
