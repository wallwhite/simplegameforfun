// @flow

import * as PIXI from 'pixi.js';
import _ from 'lodash';
import { dataPath, SCALE_VALUE } from '../constants';

class PixiMapBuilder {
    loader: any;

    app: any;

    mapNames: Array<string>;

    layers: Array<any>;

    scaleValue: number;

    constructor(app: any) {
        this.app = app;
        this.loader = app.loader;
        this.mapNames = [];
        this.layers = [];
        this.scaleValue = SCALE_VALUE(128) / 10;

        window.addEventListener('resize', this.scaleStageOnResize, 200);
    }

    scaleStageOnResize = _.throttle(() => {
        this.app.stage.children.forEach(layout => {
            // eslint-disable-next-line no-param-reassign
            layout.scale.x = SCALE_VALUE(128) / 10;
            // eslint-disable-next-line no-param-reassign
            layout.scale.y = SCALE_VALUE(128) / 10;
        });
    });

    addMap = (name: string, url: string) => {
        this.mapNames.push(name);
        this.loader.add(name, url);

        this.loader.load((loader, resources) => {
            const {
                data: { tilesets },
            } = resources[name];

            if (!_.isEmpty(tilesets)) {
                tilesets.forEach(({ source }) => {
                    const [sourceName] = source.split('.');

                    loader.add(sourceName, dataPath(source));
                });
            }
        });
    };

    getLoaderData = () => {
        this.loader.load((loader, resources) => {
            return resources;
        });
    };

    buildMap = (name: string) =>
        this.loader.load((ld, resources) => {
            const {
                data: { layers },
            } = resources[name];

            const currentTiles = [];

            layers.forEach(({ properties, data: mapData, width: mapWidth }) => {
                const { value: titleSourceName } = _.find(properties, { name: 'titleSourceName' });
                const layerInstance = new PIXI.Container();

                const { data } = resources[titleSourceName];

                if (_.has(data, 'image')) {
                    const { tileheight, tilewidth, imageheight, imagewidth, image } = data;

                    const xCount = Math.floor(imagewidth / tilewidth);
                    const yCount = Math.floor(imageheight / tileheight);

                    for (let y = 0; y < yCount; y += 1) {
                        for (let x = 0; x < xCount; x += 1) {
                            const textureX = 0;
                            const textureY = 0;

                            const texture = PIXI.Texture.from(image);
                            const textureSprite = new PIXI.Texture(
                                texture,
                                new PIXI.Rectangle(textureX, textureY, tilewidth, tileheight),
                            );

                            currentTiles.push(textureSprite);
                        }
                    }
                } else {
                    data.tiles.forEach(({ image, imagewidth, imageheight }) => {
                        const texture = PIXI.Texture.from(image);
                        const textureSprite = new PIXI.Texture(
                            texture,
                            new PIXI.Rectangle(0, 0, imagewidth, imageheight),
                        );

                        currentTiles.push(textureSprite);
                    });
                }

                this.setTilesFromSprite(mapData, currentTiles, layerInstance, { mapWidth });
                layerInstance.scale.x = this.scaleValue;
                layerInstance.scale.y = this.scaleValue;
                this.app.stage.addChild(layerInstance);
            });
        });

    setTilesFromSprite = (
        mapData: Array<number>,
        textures: Array<Object>,
        layerInstance: any,
        { mapWidth }: { mapWidth: number },
    ) => {
        mapData.forEach((mapCell, index) => {
            if (mapCell === 0) return;
            const currentTexture = textures[mapCell - 1];
            const deltaX = (index / mapWidth) % 1 === 0 ? 0 : index % mapWidth;
            const deltaY = Math.floor(index / mapWidth);
            const sprite = new PIXI.Sprite(currentTexture);

            sprite.x = deltaX * currentTexture.orig.width;
            sprite.y =
                currentTexture.orig.height !== currentTexture.orig.width
                    ? (deltaY * currentTexture.orig.height) / (currentTexture.orig.height / currentTexture.orig.width) -
                      (currentTexture.orig.height - currentTexture.orig.width)
                    : deltaY * currentTexture.orig.height;

            layerInstance.addChild(sprite);
        });
    };

    checkIsItTilelist = (items: Array<Object>) => _.every(items, (item: Object) => _.has(item, 'image'));
}

export default PixiMapBuilder;
