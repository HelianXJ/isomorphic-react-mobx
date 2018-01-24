const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    // entry: `${__dirname}/public/js/main.js`,
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server', //HRM更新时刷新整个页面，如果是only-dev-server是手动刷新
        `${__dirname}/public/js/main.js`,
    ],
    output: {
        filename: '[name].bundle.js',
        path: `${__dirname}/build`,
        publicPath: '/build/' // webpack-dev-server服务的文件是相对publicPath路径，用于设置热加载的服务器
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 启用 HMR
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],
    resolve: {
        // 定义解析模块路径时的配置，常用的就是extensions用来指定模块的后缀，这样在引入模块时就不需要写后缀会自动补全
        extensions: ['.js', '.jsx']
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
    },
    devServer: {
        hot: true,
        host: 'localhost',
        port: 3000,
        contentBase: path.resolve(__dirname, 'build')
    }
}