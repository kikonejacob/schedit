/**
 * This project do not use css in javascript
 * refer to gulpfile.js to see how css is compiled
 */
var webpack = require('webpack');

/** Default port and host it */
var port = process.env['WEBPACK_PORT'] || 1337;
var host = process.env['WEBPACK_HOST'] || '127.0.0.1';

module.exports = {
    debug : true,
    devtool : 'eval',
    entry: ['webpack-hot-middleware/client'],
    noInfo:true,
    cache:true,
    stats: {
        colors: true,
        reasons: true
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        contentBase: 'dist/js',
        hot: true,
        progress:true,
        inline: true,
        stats:{
            progress:true,
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        },
        port: port,
        host: host
    },

    stats: {
        colors: true,
        reasons: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

};