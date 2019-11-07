// @flow

import * as PIXI from 'pixi.js';
import _ from 'lodash';
import { PixiLoader, PixiActions, Keyboard, Character } from '.';

class PixiApp {
    kb: Keyboard;

    core: Object;

    loader: PixiLoader;

    actions: PixiActions;

    char: Character;

    constructor(options: Object) {
        this.core = new PIXI.Application({
            width: options.width,
            height: options.height,
            backgroundColor: '#fff',
            resizeTo: window,
            forceCanvas: true,
            renderer: PIXI.autoDetectRenderer(),
        });

        console.log(this.core);
        console.log(PIXI.autoDetectRenderer());
        this.loader = new PixiLoader(this.core);
        this.actions = new PixiActions(this.core);
        this.kb = new Keyboard();

        this.char = new Character();

        this.init();
    }

    moveMap = _.throttle(() => {
        if (this.kb.pressed.ArrowRight) {
            this.core.stage.x = this.core.stage.x - 10;
        }
        if (this.kb.pressed.ArrowLeft) {
            this.core.stage.x = this.core.stage.x + 10;
        }
    }, 1);

    init = () => {
        this.kb.watch(window);
        this.actions.addAction(this.moveMap);
    };
}

export default PixiApp;
