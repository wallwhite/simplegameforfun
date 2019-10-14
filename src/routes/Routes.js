// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routePaths from './routePaths';
import * as Pages from '../view/pages';

const Routes = () => (
    <Switch>
        <Route exact path={routePaths.homePage()} component={Pages.HomePage} />
        <Route exact path={routePaths.playPage()} component={Pages.PlayPage} />
        {/* <Redirect to={routePaths.errorPage('404')} /> */}
        {/*  TODO: ERROR PAGE */}
    </Switch>
);

export default Routes;
