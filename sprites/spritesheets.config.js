module.exports = () => {
    return {
        baseOutputPath: './assets/generated/',
        baseInputPath: './sprites/',
        files: [
            {
                inputBase: '',

                outputPath: 'sprites/',
                namePrefix: 'template_',
                filename: 'sprites',

                sprites: [
                    { name: 'test', path: 'test.jpg' },
                    { name: 'dot', path: 'dot.jpg' },
                ]
            }
        ]
    }
}
