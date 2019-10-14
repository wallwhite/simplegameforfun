// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import withStyles from 'react-jss';
import { Routes } from '../../routes';

const AppRoot = () => {
    return (
        <div>
            <Route component={Routes} />
        </div>
    );
};

// $FlowFixMe
export default withStyles({ padding: 0, margin: 0 })(AppRoot);
