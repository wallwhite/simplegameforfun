/* eslint-disable new-cap */
// @flow

import * as PIXI from 'pixi.js';
import { PixiMapBuilder } from '.';

class PixiLoader {
    app: any;

    mapLoaded: boolean;

    timeout: ?TimeoutID;

    builder: PixiMapBuilder;

    constructor(app: any) {
        this.app = app;

        this.timeout = null;

        this.mapLoaded = false;

        this.init();
    }

    init = () => {
        this.builder = new PixiMapBuilder(this.app);

        this.builder.addMap('gameMap', '/data/baseMap.json');

        this.app.loader.onProgress.add(() => {
            this.renderLoader();
        });

        this.app.loader.onComplete.add(() => {
            this.timeout = setTimeout(() => {
                clearTimeout(this.timeout);
                this.timeout = null;
                if (!this.timeout && !this.mapLoaded) {
                    this.app.stage.removeChildAt(0);
                    this.builder.buildMap('gameMap');
                    this.mapLoaded = true;
                }
            }, 10);
        });
    };

    renderLoader = () => {
        const text = new PIXI.Text('Loading...', {
            fontFamily: 'Arial',
            fontSize: 50,
            fill: '#FFFFFF',
            align: 'center',
        });

        if (this.app.stage.children.length === 0) {
            text.x = window.innerWidth / 2 - text.width / 2;
            text.y = window.innerHeight / 2 - text.height / 2;

            this.app.stage.addChild(text);
        }
    };
}

export default PixiLoader;
