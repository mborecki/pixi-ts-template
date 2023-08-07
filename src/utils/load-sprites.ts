import { Assets } from 'pixi.js';

export default async function loadSprites(sprites: [string, string][]): Promise<void> {
    Assets.init();

    sprites.forEach(assetInfo => {
        Assets.add(...assetInfo);
    })

    await Promise.allSettled(sprites.map(async (s) => {

        try {
            // debugger;
            await Assets.load(s[0]);
        } catch(e) {
            console.error(e);
        }
        })
    )
}
