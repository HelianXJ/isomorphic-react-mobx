const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: `${__dirname}/public/js/main.js`,
    output: {
        // filename: '[name].bundle.js',
        filename: 'bundle.js',
        path: `${__dirname}/build`,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less\.module/,
                // loader: ExtractTextPlugin.extract('css?modules&localIdentName=[local]___[hash:base64:5]!postcss!less')
                use: ExtractTextPlugin.extract({
                    fallback: 'css?modules&localIdentName=[local]___[hash:base64:5]',
                    use: ['css-loader', 'less-loader'],
                })
            }
        ]
    }
}