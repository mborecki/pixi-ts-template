const fs = require('fs');
let Path = require("path");

// https://www.npmjs.com/package/free-tex-packer-core
let texturePacker = require("free-tex-packer-core");

const baseOutput = './dist/assets';
const baseInput = './sprites';

/**
 * type SpritesheetData = {
 *   outPath: string,
 *   filename: string,
 *   sprites: {name: string, path: string}[]
 * }
 */

const spritesheets = [{
    outPath: '/',
    filename: 'sprites',
    sprites: [
        { name: 'button/normal', path: './button.png' },
        { name: 'button/clicked', path: './button-clicked.png' }
    ]
}];

spritesheets.forEach(ss => {
    const images = ss.sprites.map((s) => {
        return {
            path: s.name,
            contents: fs.readFileSync(Path.join(baseInput, s.path))
        }
    });
    texturePacker(images, {
        exporter: 'Pixi',
        textureName: ss.filename,
        packer: 'OptimalPacker',
        padding: 2,
        width: 2048 * 2,
        height: 2048 * 2,
    }, (files, error) => {
        if (error) {
            console.error('Packaging failed', error);
        } else {
            for (let item of files) {
                console.log(item.name);
                console.log({baseOutput, o: ss.outPath}, Path.join(baseOutput, ss.outPath))
                fs.mkdirSync(Path.join(baseOutput, ss.outPath), { recursive: true })
                fs.writeFileSync(Path.join(baseOutput, ss.outPath, item.name), item.buffer)
            }
        }
    })
});
