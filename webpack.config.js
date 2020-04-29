const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const isProduction = process.env.NODE_ENV === 'production';

const modes = {
    [true]: 'production',
    [false]: 'development'
}

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const config = {
    context: __dirname,

    entry: ['babel-polyfill', './src/main.ts'],

    output: {
        filename: 'app.[hash].js',
        path: path.join(__dirname, './dist')
    },

    target: 'web',

    mode: modes[isProduction],

    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@': resolve('src')
        }
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }, {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'tslint-loader'
            }, {
                test: /\.ts$/,
                loader: 'ts-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'image/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }, {
                test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin(['dist'],{　　
        　　　　root: path.resolve(__dirname, './')  
        　　}
        ),
        new MiniCssExtractPlugin({
            filename: './css/style.[contenthash].css'
        }),
        new OptimizeCSSAssetsPlugin({}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: !isProduction ? '"development"' : '"production"'
            }
        })
    ]
};

if (isProduction) {
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
    module.exports = merge(config, {
        optimization: {
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    parallel: require('os').cpus().length,
                    uglifyOptions: {
                        ie8: false,
                        ecma: 8,
                        output: {
                            beautify: false,
                            comments: false
                        },
                        compress: { 
                            dead_code: true,  
                            warnings: false,
                            loops: true
                        }
                    }
                })
            ]
        }
    });
} else {
    module.exports = merge(config, {
        devServer: {
            port: 9000,
            open: true,
            watchContentBase: true,
            historyApiFallback: true,
            proxy: {
                '/api': {
                    target: 'http://vision-api.yottasystem.com',
                    pathRewrite: { '^/api': '' },
                    changeOrigin: true
                },
                '/ossimg': {
                    target: 'https://vision-backend.oss-cn-beijing.aliyuncs.com',
                    pathRewrite: { '^/ossimg': '' },
                    changeOrigin: true
                }
            }
            
        }
    });
}
