import React from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import SecureRoute from './components/SecureRoute';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import fetch from './utils/fetch';
import api from './api';

const App = () => (
    <BrowserRouter>
        <>
            <SecureRoute exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
        </>
    </BrowserRouter>
);

// fetch('http://localhost:3000/graphql', {
//     method: 'POST',
//     headers: {
//         Authorization:
//             'Bearer ' +
//             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0NjMwYTBiLWVhYjMtNGQyZC1hMWU0LTZmODc1MjVkYWM3MyIsImVtYWlsIjoicEBnbWFpbC5jb20iLCJpYXQiOjE1NDQwNTE1NzMsImV4cCI6MTU0NDA1MTg3M30.0Q-s1wLU_S31g4-qxVoerpEK_ETeBP-1aBt__g4FitA',
//     },
// });

export default App;

// TODO
/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>*/
