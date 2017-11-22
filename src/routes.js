import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppPage from './containers/AppPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';


class routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/" component={AppPage}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default routes;
