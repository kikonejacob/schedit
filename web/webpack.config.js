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

module.exports.development = {
    debug : true,
    devtool : 'eval',
    entry: entry,
    cache:true,
    output: output,

     stats: {
        colors: true,
        reasons: true
    },
    node: {
     fs: "empty"
   },
    devServer: {
        contentBase: "dist",
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
    resolve: {
        alias: {
            'subschema': path.join(__dirname, 'node_modules/subschema/src/index.jsx')
        }
    },
    stats: {
        colors: true,
        reasons: true
    },
    module : {
        loaders : [
            { test: /\.js(x)?$/,
             exclude: /node_modules/,
             include:['./src'],
             loaders: [ 'babel-loader']
            },
            { test: /\.json?$/,
              loader: "json-loader",
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
                loaders: [ "css-loader","less-loader"]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
              }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
              }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/octet-stream"
              }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
              }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=image/svg+xml"
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
            new webpack.NoErrorsPlugin(),
            new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery",
             //Backgrid: "../vendors/backgrid.js",
             //"window.Backgrid": "../vendors/backgrid.js",
             //Backbone: "Backbone"
            }),


           /* new webpack.ResolverPlugin([
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
            ]),*/
            //new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
            //new ExtractTextPlugin("styk.css")



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
                'subschema-styles':path.join(__dirname, 'node_modules/subschema/src/styles')*/

            }
        }

};

module.exports.production = {
    debug: false,
    entry: entry,
    output: output,
    module : {
        loaders : [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
              }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
              }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
              }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
              }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
              }
        ]
    },

    postcss: function () {
        // The context of this function is the webpack loader-context
        // see: http://webpack.github.io/docs/loaders.html#loader-context

        return [precss,autoprefixer];
    },
    plugins: [

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
            }),
        /*new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ]),
         new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
        new ExtractTextPlugin("[name].css")*/
    ],
};
