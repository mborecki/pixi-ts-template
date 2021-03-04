import * as PIXI from 'pixi.js';

export default function loadSprites(app: PIXI.Application, sprites: [string, string][]): Promise<void> {
    return new Promise(resolve => {
        sprites.forEach(assetInfo => {
            app.loader.add(...assetInfo);
        })

        app.loader.load(() => {
            resolve();
        })

        app.loader.onError.add((...args: any[]) => {
            console.error(...args);
        })

    })
}
