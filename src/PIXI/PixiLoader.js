/* eslint-disable new-cap */
import * as PIXI from 'pixi.js';

class PixiLoader {
    constructor(app) {
        this.app = app;

        this.stage = new PIXI.Container();

        this.done = false;

        const { loader } = app;

        loader.add('gameTileset', '/data/gameTileset.json');

        loader.load((ld, resources) => {
            const {
                gameTileset: {
                    data: { tiles },
                },
            } = resources;

            const block = new PIXI.Sprite.from(tiles[0].image);

            block.x = this.app.renderer.width / 2;
            block.y = this.app.renderer.height / 2;

            block.anchor.x = 0.5;
            block.anchor.y = 0.5;
            this.app.stage.addChild(block);
            // console.log(ld, resources);
        });
    }

    create = () => {};
}

export default PixiLoader;
