const env = process.env.NODE_ENV

var path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: env || 'development',
    devtool: 'source-map',

    entry: {
        app: [
            path.resolve(__dirname, 'src/index.ts')
        ]
    },
    // devtool: 'cheap-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        clean: true
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: path.join(__dirname, 'src/', `index.html`)
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './assets',
                    to: 'assets'
                }
            ]
        })
    ],

    module: {

        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },

    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
