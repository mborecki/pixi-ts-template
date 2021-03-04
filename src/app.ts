import * as PIXI from 'pixi.js';
import { Sprite } from 'pixi.js';
import loadSprites from './utils/load-sprites';

export default class App extends PIXI.Application {
    constructor() {
        super({
            backgroundColor: 0xe6db88
        });

        loadSprites(this, [
            ['sprites', '/dist/assets/sprites.json']
        ]).then(() => {


            const button = PIXI.Sprite.from('button/normal');

            button.interactive = true;

            this.stage.addChild(button);

            button.on('click', () => {
                button.texture = PIXI.Texture.from('button/clicked');
            })
        })
    }
}
