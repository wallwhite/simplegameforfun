// @flow

import React, { Component } from 'react';
import withStyles from 'react-jss';
import cx from 'classnames';

const styles = {
    root: {
        background: 'red',
        width: '100vw',
        height: '100vh',
    },
};

type GameProps = {
    classes: {
        [key: string]: string,
    },
};

class Game extends Component<GameProps> {
    gameContainer = React.createRef();

    componentDidMount() {}

    render() {
        const { classes } = this.props;
        const cls = cx(classes.root);

        return <div className={cls} ref={this.gameContainer} />;
    }
}

// $FlowFixMe
export default withStyles(styles)(Game);
