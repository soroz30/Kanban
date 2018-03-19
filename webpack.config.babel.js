import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import autoprefixer from 'autoprefixer';

const env = process.env.NODE_ENV || 'development';

let plugins = [
                new webpack.HotModuleReplacementPlugin(),
                new ExtractTextPlugin({
                    filename: 'styles.css',
                    allChunks: true
                }),
                new HtmlWebpackPlugin({
                    template: './client/src/index.html'
                })
            ]

if (env === 'PRODUCTION') {
    plugins.push(
        new UglifyJsPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        })
    )
}

const config = {
    entry: ['babel-polyfill', 'react-hot-loader/patch', './client/src/index.js'],
    output: {
        path: path.join(__dirname, '/client/dist'),
        filename: 'build.js'
    },
    devServer: {
        contentBase: './client/src',
        historyApiFallback: true,
        hot: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.sass$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                              plugins: () => autoprefixer({
                                browsers: ['last 3 versions', '> 1%']
                              })
                            }
                        },
                        'sass-loader'
                ]
                }))
            }
        ]
    },
    plugins,
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.sass', '.jpeg', '.jpg', '.gif', '.png']
    }
}

export default config;