const fs = require('fs');
let Path = require("path");

// https://www.npmjs.com/package/free-tex-packer-core
let texturePacker = require("free-tex-packer-core");

const imagemin = import('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const config = require('./spritesheets.config')();

const fileNames = [];

const { baseOutputPath, baseInputPath } = config;

const packingPromises = config.files.map(sheetConfig => {

    const inputBase = sheetConfig.inputBase || '';
    const namePrefix = sheetConfig.namePrefix || '';
    const filename = sheetConfig.filename;
    const outputPath = sheetConfig.outputPath;
    const sprites = sheetConfig.sprites;

    const images = sprites.map((s) => {
        return {
            path: namePrefix + s.name,
            contents: fs.readFileSync(Path.join(baseInputPath, inputBase, s.path))
        }
    });
    return new Promise((resolve, reject) => {
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
                reject(error);
            } else {
                for (let item of files) {
                    console.log(item.name);
                    fs.mkdirSync(Path.join(baseOutputPath, outputPath), { recursive: true })

                    if (/\.json$/.test(item.name)) {
                        fileNames.push(Path.join(outputPath, item.name));
                    }

                    imagemin.then((min) => {
                        min.default.buffer(item.buffer, {
                            plugins: [imageminPngquant()]
                        }).then((data) => {
                            fs.writeFileSync(Path.join(baseOutputPath, outputPath, item.name), data)
                            resolve();
                        });
                    })
                }
            }
        })
    })
});

Promise.all(packingPromises)
    .then(() => {
        console.log(fileNames);
        fs.writeFileSync(Path.join('./src/sprites-index.json'), JSON.stringify(fileNames));
    })
