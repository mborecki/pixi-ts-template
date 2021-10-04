import * as PIXI from 'pixi.js';
import { Sprite } from 'pixi.js';
import getAudioPlayer from './utils/audio';
import loadSprites from './utils/load-sprites';

type AppConfig = {
    assetsPath: string,
}

export default class App extends PIXI.Application {
    private audio = getAudioPlayer();

    constructor(private config: AppConfig) {
        super({
            backgroundColor: 0xe6db88
        });

        loadSprites(this, [
            ['_ph', `${this.config.assetsPath}generated/_ph.json`]
        ]).then(() => {


            const button = PIXI.Sprite.from('test');

            button.interactive = true;

            this.stage.addChild(button);

            button.on('click', async () => {
                button.texture = PIXI.Texture.from('test');
                const audio = await this.audio;
                audio.play('blip');
            })
        })
    }
}
