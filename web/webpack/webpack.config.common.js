/**
 *  webpack configuration file
 */
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var path = require('path');
var _ = require( 'lodash' );
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var appPathTo;

/** Entry for the app main file */
var entry = [
    path.join(__dirname,'../src/app/main.js'),
];
/** Output directory */
var output = {
    path: path.join(__dirname, '../dist/js/'),
    filename: 'main.js',
    chunkFilename: '[id].chunk.js',
};

var appPathTo = _.partial( pathTo, 'app' );

function pathTo() {
    return path.join( __dirname, '../src', path.join.apply( path, arguments ) );
}

/** Common configuration shared by development and production */
module.exports={
    entry:entry,
    output:output,
    module : {
        loaders : [
            { test: /\.js(x)?$/,
                exclude: /node_modules/,
                include:['./src'],
                loaders: [ 'babel-loader']
            },
            { test: /\.json?$/,
                loader: 'json-loader',
            },
            , {
                test: /\.js(x)?$/,
                exclude: [
                    /webpack/,
                    /node_modules\/(?!(subschema))/,
                    'src'
                ],
                loaders: ['babel-loader']
            },
            {
                test:   /\.css$/,
                loaders: [ 'css-loader','less-loader']
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml'
            },
              , {
                  test:/\.less$/,
                  loader:'style!css!less'
              }

        ]
    },
    postcss: function () {
        // The context of this function is the webpack loader-context
        // see: http://webpack.github.io/docs/loaders.html#loader-context

        return [precss, autoprefixer];
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        new webpack.IgnorePlugin(/vertx/),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    ],
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
            /*'subschema': path.join(__dirname, 'node_modules/subschema/src/index.jsx'),
            'subschema-styles':path.join(__dirname, 'node_modules/subschema/src/styles')
            */

        }
    }

};