import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getItem} from '../utils/local-storage';

interface Props {
    component: any;
    path: string;
    exact?: boolean;
}

const SecuredRoute = (props: Props) => {
    const {component: Component, path, exact} = props;
    const authToken = getItem('token');

    if (!authToken) {
        return <Redirect to="/login" />;
    }

    return (
        <Route
            exact={exact}
            path={path}
            render={() => {
                return <Component />;
            }}
        />
    );
};

export default SecuredRoute;
