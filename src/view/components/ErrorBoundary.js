// @flow

import React, { Component } from 'react';
import { ErrorIndicator } from '.';

type ErrorBoundaryProps = {
    children?: any,
};

type ErrorBoundaryState = {
    hasError: boolean,
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        hasError: false,
    };

    static defaultProps = {
        children: null,
    };

    componentDidCatch() {
        this.setState({
            hasError: true,
        });
    }

    render() {
        const { hasError } = this.state;
        // eslint-disable-next-line react/prop-types
        const { children } = this.props;

        if (hasError) {
            return <ErrorIndicator />;
        }

        return children || null;
    }
}

export default ErrorBoundary;
