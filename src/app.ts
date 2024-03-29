import * as PIXI from 'pixi.js';
import AppStage from './stage';
import getAudioPlayer from './utils/audio';
import loadSprites from './utils/load-sprites';
import spritesIndex from './sprites-index.json';

type AppConfig = {
    assetsPath: string,
}

export default class App extends PIXI.Application {

    constructor(private config: AppConfig) {
        super({
            backgroundColor: 0xe6db88
        });

        const preloader = PIXI.Sprite.from('data:image/png;base64,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');

        preloader.anchor.set(.5);
        preloader.position.set(this.renderer.width / 2, this.renderer.height / 2);

        const preloaderAnimation = (delta: number) => {
            preloader.rotation += 0.02 * delta;
        }

        this.ticker.add(preloaderAnimation)

        this.stage.addChild(preloader);


        Promise.all([
            loadSprites(
                spritesIndex.map((file, index) => {
                    return [`spritesheet_${index}`, `${this.config.assetsPath}/generated/${file}`]
                })
            ),
            getAudioPlayer()
        ]).then(() => {

            this.ticker.remove(preloaderAnimation);
            preloader.destroy();
            this.stage = new AppStage(this);
        })
    }
}
