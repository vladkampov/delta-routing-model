webpack = require('webpack');
path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

webpackConfig = {
    context: __dirname,
    entry: {
        bundle: './src/jsx/app.jsx',
        styles: './src/less/main.less'
    },
    output: {
        filename: '[name].js',
        path: './build',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'stage-0', 'stage-1']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!less-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader'
            }
        ],
        noParse: [
          /aws\-sdk/,
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./'] }
        }),
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};

module.exports = webpackConfig;
