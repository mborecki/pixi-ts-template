import * as PIXI from 'pixi.js';
import AppStage from './stage';
import loadSprites from './utils/load-sprites';

type AppConfig = {
    assetsPath: string,
}

export default class App extends PIXI.Application {

    constructor(private config: AppConfig) {
        super({
            backgroundColor: 0xe6db88
        });

        loadSprites(this, [
            ['sprites', `${this.config.assetsPath}/generated/sprites.json`]
        ]).then(() => {
            this.stage = new AppStage(this);
        })
    }
}
