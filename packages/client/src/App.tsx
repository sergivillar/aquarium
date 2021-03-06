import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Route} from 'react-router-dom';
import SecureRoute from './components/SecureRoute';
import Dashboard from './components/Dashboard';
import Login from './auth/components/Login';
import SingUp from './auth/components/SingUp';
import {client} from './api';

const App = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <>
                <Route exact path="/login" component={Login} />
                <Route exact path="/singup" component={SingUp} />
                <SecureRoute exact path="/" component={Dashboard} />
            </>
        </BrowserRouter>
    </ApolloProvider>
);

export default App;

// TODO
/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>*/
