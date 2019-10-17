/* eslint-disable new-cap */
import * as PIXI from 'pixi.js';
import { PixiMapBuilder } from '.';

class PixiLoader {
    constructor(app) {
        this.app = app;

        this.stage = new PIXI.Container();

        this.done = false;

        this.builder = new PixiMapBuilder(this.app);

        this.builder.addMap('gameMap', '/data/baseMap.json');

        this.builder.getLoaderData();

        this.builder.buildMap('gameMap');
    }
}

export default PixiLoader;
