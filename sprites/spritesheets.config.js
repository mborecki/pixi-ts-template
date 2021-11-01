module.exports = () => {
    return [
        {
            inputBase: './sprites/',
            namePrefix: 'template_',

            outputPath: './assets/generated/',
            filename: 'sprites',

            sprites: [
                { name: 'test', path: 'test.jpg' },
                { name: 'dot', path: 'dot.jpg' },
            ]
        }
    ]
}
