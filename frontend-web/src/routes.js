import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login  from './pages/login/index';
import Register  from './pages/register/index';
import Main from './pages/main';
import RegisterCase from './pages/register-case';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route  exact path="/" component={Login} />
                <Route   path="/register" component={Register} />
                <Route   path="/home" component={Main} />
                <Route   path="/register-case" component={RegisterCase} />
            </Switch>
        </BrowserRouter>
    )
}
