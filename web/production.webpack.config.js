
var entry = './src/app/main.js',
  output = {
    path: __dirname,
    filename: 'main.js'
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
    devtool : 'source-map',
    entry: entry,
    cache:true,
    output: output,
     stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        alias: {
            'subschema': path.join(__dirname, 'node_modules/subschema/src/index.jsx')
        }
    },
    module : {
        loaders : [
            { test: /\.js(x)?$/, exclude: /node_modules/, loaders: [ 'babel-loader'] },
            , {
                test: /\.js(x)?$/,
                exclude: [
                    /webpack/,
                    /node_modules\/(?!(subschema))/,
                    'public'
                ],
                loaders: ['babel?stage=0']
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

