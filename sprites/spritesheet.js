const fs = require('fs');
let Path = require("path");

// https://www.npmjs.com/package/free-tex-packer-core
let texturePacker = require("free-tex-packer-core");

const imagemin = import('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const config = require('./spritesheets.config')();

config.forEach(sheetConfig => {

    const inputBase = sheetConfig.inputBase || '';
    const namePrefix = sheetConfig.namePrefix || '';
    const filename = sheetConfig.filename;
    const outputPath = sheetConfig.outputPath;
    const sprites = sheetConfig.sprites;

    const images = sprites.map((s) => {
        return {
            path: namePrefix + s.name,
            contents: fs.readFileSync(Path.join(inputBase, s.path))
        }
    });
    texturePacker(images, {
        exporter: 'PIXI',
        textureName: filename,
        packer: 'OptimalPacker',
        padding: 2,
        width: 2048,
        height: 2048,
        allowRotation: false, // Phaser3 nie obsługuje rotacji
        allowTrim: false
    }, (files, error) => {
        if (error) {
            console.error('Packaging failed', error);
        } else {
            for (let item of files) {
                console.log(item.name);
                fs.mkdirSync(outputPath, { recursive: true })

                imagemin.then((min) => {
                    min.default.buffer(item.buffer, {
                        plugins: [imageminPngquant()]
                    }).then((data) => {
                        fs.writeFileSync(Path.join(outputPath, item.name), data)
                    });
                })
            }
        }
    })
});
