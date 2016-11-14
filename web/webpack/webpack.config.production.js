var CleanPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
module.exports.production = {
    debug: false,
    devtool: 'source-map',
    plugins:[
        new CleanPlugin([ path.join(__dirname,'../src/dist'),], { root:  path.join(__dirname,'../src/app/'), }),
       // optimizations
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }}),
    ]

};
