import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import api, {tokenRefreshInterceptor} from './api';
import {getItem} from './utils/local-storage';
import {isAuthenticated} from './utils/user';

const renderApp = (Main: any) => {
    ReactDOM.render(<Main />, document.getElementById('root'));
};

(async () => {
    const [email, token, refreshToken] = getItem(['email', 'token', 'refreshToken']) as string[];

    if (!email || !token || !refreshToken) {
        return renderApp(App);
    }

    if (!isAuthenticated()) {
        await api.refreshToken(email, refreshToken);
    }

    tokenRefreshInterceptor();

    renderApp(App);
})();
