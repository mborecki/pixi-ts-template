import * as PIXI from 'pixi.js';
import getAudioPlayer from './utils/audio';

export default class AppStage extends PIXI.Container {
    private audio = getAudioPlayer();

    constructor(private app: PIXI.Application) {
        super();

        const button = PIXI.Sprite.from('template_test');

        button.interactive = true;
        button.buttonMode = true;

        this.addChild(button);

        button.on('click', async () => {
            const audio = await this.audio;
            audio.play('blip');
        })
    }
}
