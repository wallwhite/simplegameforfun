import * as PIXI from 'pixi.js';
import { PixiLoader } from '.';

class PixiApp {
    constructor(options) {
        this.core = new PIXI.Application({
            width: options.width,
            height: options.height,
            backgroundColor: '#fff',
            resizeTo: window,
        });

        this.loader = new PixiLoader(this.core);
    }
}

export default PixiApp;
