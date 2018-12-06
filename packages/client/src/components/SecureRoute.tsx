import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getItem} from '../utils/local-storage';

interface Props {
    component: any;
    path: string;
    exact?: boolean;
}

const SecuredRoute = (props: Props) => {
    const {component: Component, ...rest} = props;
    const [email, token, refreshToken] = getItem(['email', 'token', 'refreshToken']) as string[];
    const isAuthenticated = !!email && !!token && refreshToken;

    return (
        <Route
            {...rest}
            render={propsRoute =>
                isAuthenticated ? (
                    <Component {...propsRoute} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: propsRoute.location},
                        }}
                    />
                )
            }
        />
    );
};

export default SecuredRoute;
