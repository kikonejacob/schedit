// Karma configuration
// Generated on Sat Mar 19 2016 01:37:58 GMT-0500 (CDT)
var webpackConfig=require('./webpack.config.js')['development'];
webpackConfig.devtool = 'inline-source-map';
webpackConfig.noInfo=true;
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',




    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','sinon','chai'],


    // list of files / patterns to load in the browser
    files: [
      'test/index.js',
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
       'test/index.js': [ 'webpack', 'sourcemap' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots','spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-spec-reporter',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-sinon'
    ],
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,




    webpack:webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
