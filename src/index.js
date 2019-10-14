// @flow
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
// $FlowFixMe
import { createBrowserHistory } from 'history';
import { AppRoot, ErrorBoundary } from './view/components';
import './assets/style.css';
// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

const getRootElement = (): HTMLElement => (document.getElementById('root'): any);

const rootElement: HTMLElement = getRootElement();

const renderApp = Component => {
    render(Component, rootElement);
};

renderApp(
    <ErrorBoundary>
        <Router history={(history: any)}>
            <AppRoot />
        </Router>
    </ErrorBoundary>,
);
