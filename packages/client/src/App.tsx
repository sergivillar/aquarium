import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SecureRoute from './components/SecureRoute';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const App = () => (
    <BrowserRouter>
        <>
            <Route exact path="/login" component={Login} />
            <SecureRoute exact path="/" component={Dashboard} />
        </>
    </BrowserRouter>
);

export default App;

// TODO
/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>*/
