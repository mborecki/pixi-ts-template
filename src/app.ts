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
            ['sprites', `${this.config.assetsPath}/generated/sprites.json`]
        ]).then(() => {


            const button = PIXI.Sprite.from('template_test');

            button.interactive = true;

            this.stage.addChild(button);

            button.on('click', async () => {
                const audio = await this.audio;
                audio.play('blip');
            })
        })
    }
}
