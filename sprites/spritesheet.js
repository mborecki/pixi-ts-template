const fs = require('fs');
let Path = require("path");
const crypto = require("crypto");

// https://www.npmjs.com/package/free-tex-packer-core
let texturePacker = require("free-tex-packer-core");

const imagemin = import('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const config = require('./spritesheets.config')();

const fileNames = new Set();
const JSONFilesWithHash = new Set();

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
            detectIdentical: false,
            allowRotation: false,
            allowTrim: false
        }, (files, error) => {
            if (error) {
                console.error('Packaging failed', error);
                reject(error);
            } else {

                resolve(Promise.all(files.map(item => {
                    fs.mkdirSync(Path.join(baseOutputPath, outputPath), { recursive: true })

                    return imagemin.then((min) => {
                        return min.default.buffer(item.buffer, {
                            plugins: [imageminPngquant()]
                        }).then((data) => {
                            fileNames.add(Path.join(outputPath, item.name.replace(/\.[^/.]+$/, "")));

                            return fs.promises.writeFile(Path.join(baseOutputPath, outputPath, item.name), data)
                        }).catch(error => {
                            console.log(error);
                        })
                    })
                })).then((x) => {
                    console.log('Spritesheet generated:', filename);
                }))
            }
        })
    })
});

Promise.all(packingPromises)
    .then(() => {

        fileNames.forEach(filename => {

            const PNGFile = Path.join(baseOutputPath, filename + '.png');
            const JSONFile = Path.join(baseOutputPath, filename + '.json');

            const png = fs.readFileSync(PNGFile);
            const json = JSON.parse(fs.readFileSync(JSONFile));

            const hash = crypto.createHash('md5').update(png).digest('hex');

            json.meta.image = json.meta.image.replace(/\.png$/, `.${hash}.png`)
            fs.writeFileSync(JSONFile, JSON.stringify(json, null, 4))


            const newJSONfile = `${filename}.${hash}.json`;
            const newPNGfile = `${filename}.${hash}.png`;


            fs.renameSync(Path.join(baseOutputPath, filename + '.png'), Path.join(baseOutputPath, newPNGfile));
            fs.renameSync(Path.join(baseOutputPath, filename + '.json'), Path.join(baseOutputPath, newJSONfile));

            JSONFilesWithHash.add(newJSONfile)
        })

        console.log('Spritesheet list', Array.from(JSONFilesWithHash));

        fs.writeFileSync(Path.join('./src/sprites-index.json'), JSON.stringify(Array.from(JSONFilesWithHash)));
    })
