const Path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function (env = {}) {
    const entry = './src/index.ts';
    const output = {
        filename: 'lib.js',
        path: Path.join(__dirname, 'dist'),
        library: "PixiDemo",
        libraryTarget: "umd"
    };
    const rules = [
        {
            test: /\.ts$/,
            exclude: [
                /\.(test|spec)\./
            ],
            loader: 'ts-loader',
            options: {
                compilerOptions: {}
            }
        }
    ];


    return {
        mode: 'none',
        entry,
        output,
        module: {
            rules
        },
        resolve: {
            plugins: [new TsconfigPathsPlugin({})],
            extensions: ['.ts', '.js', '.json']
        }
    }

}
