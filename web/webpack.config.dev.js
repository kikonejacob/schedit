var path = require('path');
var port = process.env['WEBPACK_PORT'] || 1337;
var host = process.env['WEBPACK_HOST'] || '127.0.0.1';
console.log('webpack port:'+port);
var _ = require( 'lodash' );


var appPathTo;

function pathTo() {
    return path.join( __dirname, 'src', path.join.apply( path, arguments ) );
}

appPathTo = _.partial( pathTo, 'app' );

/*
var entry= [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/only-dev-server',
        './src/app/main.js'
    ],*/
var entry= [
      'webpack-hot-middleware/client',
      './src/app/main.js',
    ],

  output = {
    path: path.join(__dirname, "dist/js/"),
    filename: 'main.js',
    chunkFilename: '[id].chunk.js'



  };

  function fromRootDir(matchPath) {
    return new RegExp(process.cwd() + matchPath);
};



/* dependency for  postcss */
 var autoprefixer = require('autoprefixer');
 var precss     = require('precss');

 var ExtractTextPlugin = require("extract-text-webpack-plugin");



webpack = require("webpack");
var path = require('path');


/**
 * This project do not use css in javascript
 * refer to gulpfile.js to see how css is compiled
 */

module.exports = {
    resolve: {
            extensions: [ '', '.js', '.jsx','json' ],
            alias: {
                //application aliases
                utils: appPathTo( 'utils' ),
                container: appPathTo( 'forms'),
                components:appPathTo('components'),
                routers: appPathTo( 'routers'),
                lib: appPathTo( 'lib'),
                services:appPathTo('services'),
                controllers:appPathTo('controllers'),
                modules:appPathTo('modules'),
                'subschema': path.join(__dirname, 'node_modules/subschema/src/index.jsx'),
                'subschema-styles':path.join(__dirname, 'node_modules/subschema/src/styles')

            }
        }

};
