// @flow

import React, { Component } from 'react';
import withStyles from 'react-jss';
import cx from 'classnames';
// import * as PIXI from 'pixi.js';
import { PixiApp } from '../../PIXI';

const styles = {
    root: {
        background: '#ccc',
        width: '100vw',
        height: '100vh',
    },
};

type GameLayoutContainerProps = {
    classes: {
        [key: string]: string,
    },
};

class GameLayoutContainer extends Component<GameLayoutContainerProps> {
    stageHeight = window.innerHeight;

    stageWidth = window.innerWidth;

    gameContainer = React.createRef();

    componentDidMount() {
        // const { current: currentContainer } = this.gameContainer;
        // eslint-disable-next-line no-unused-vars
        const app = new PixiApp({ width: this.stageWidth, height: this.stageHeight });

        // if (currentContainer) currentContainer.appendChild(app.core.view);
    }

    render() {
        const { classes } = this.props;
        const cls = cx(classes.root);

        return (
            <div className={cls} ref={this.gameContainer}>
                {/* <Stage width={this.stageWidth} height={this.stageHeight} options={{ resizeTo: window }} /> */}
            </div>
        );
    }
}

// $FlowFixMe
export default withStyles(styles)(GameLayoutContainer);
