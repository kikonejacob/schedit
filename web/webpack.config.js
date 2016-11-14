
var merge = require('webpack-merge');
var common=require('./webpack/webpack.config.common');
var dev=require('./webpack/webpack.config.dev');
var production= require('./webpack/webpack.config.production');
var isProduction = process.env.NODE_ENV == 'production';

if(isProduction){

    module.exports=merge(common,production);

}
else
{
    module.exports=merge(common,dev);
}