/**
 * School edit 2016
 *
 * gulp build --type production
 */


var gulp = require('gulp');
var shell = require('gulp-shell');
var merge = require('merge-stream');
var path = require('path');
var webpackStream = require('webpack-stream');
var webpack = require("webpack");
var gutil = require("gulp-util");

var less = require('gulp-less');
var $ = require('gulp-load-plugins')();
var del = require('del');

var sourcemaps = require('gulp-sourcemaps');

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];


//console.log(webpackConfig.output);

var WebpackDevServer = require("webpack-dev-server");

var port = $.util.env.port || 1337;
var src = 'src/';
var dist = 'dist/';
var node_module='node_modules/';

var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

if (isProduction){
  var uglify = require('gulp-uglify');

}


gutil.log('SCHOOL EDIT 2016');
gutil.log('Gulp is used to build the project.');

gulp.task('webpack-scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe(sourcemaps.init())
    .pipe(webpackStream(webpackConfig))
    .pipe(isProduction ? uglify() : $.util.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }));
    //.pipe($.connect.reload());
});


var exec = require('child_process').exec;

gulp.task('server', function (cb) {
  exec('npm start', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})


gulp.task("webpack-dev-server", function(callback) {




    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackConfig),
                       webpackConfig.devServer)
        .listen(webpackConfig.devServer.port, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://"+webpackConfig.devServer.host+":"+webpackConfig.devServer.port);
    });
});


var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');
/*var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var variables = require('postcss-css-variables');
var cssnested = require('postcss-nested');
var url = require("postcss-url")({
   url: "inline"
});
var atImport = require('postcss-import')({
    path: dist+'css',
    onImport: function(files) {
        console.log('========== import ==========');
        files.forEach(function(file) {
            console.log('import:', file);
        });
    }
});
*/

gulp.task('icons', function() {
    var font_awsome= gulp.src(node_module + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest(dist+'fonts'));
    var bootstrap= gulp.src(node_module + '/bootstrap/fonts/**.*')
        .pipe(gulp.dest(dist+'fonts'));
    return merge(bootstrap,font_awsome);
});

/*
gulp.task('styles', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        mqpacker,
        csswring,
        variables,
        atImport,
        cssnested
    ];
    return gulp.src('./src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(dist+'css'));
});
*/

gulp.task('styles', function () {
    return gulp.src('./src/css/*.css').pipe(
        postcss([
            require('precss')({ /* options */ })
        ])
    ).pipe(
        gulp.dest(dist+'css')
    );
});

gulp.task('html', function() {
  return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

/*
gulp.task('styles',function(cb) {
  return gulp.src(src + 'stylus/main.styl')
    .pipe($.stylus({
      compress: isProduction,
      'include css' : true
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());

});

*/

gulp.task('less', function () {
  return gulp.src(src+'/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35728
    }
  });
});

gulp.task('static', function(cb) {
  return gulp.src(src + 'static/**/*')
    .pipe($.size({ title : 'static' }))
    .pipe(gulp.dest(dist + 'static/'));
});


gulp.task('watch', function() {
  //gulp.watch(src + 'stylus/*.styl', ['styles']);
  gulp.watch(src + 'css/*.css', ['styles']);
  gulp.watch(src + 'index.html', ['html']);
  //gulp.watch(src + 'app/**/*.js', ['webpack-scripts']);
});

gulp.task('clean', function(cb) {
  return del([dist], cb);
});



// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build-assets', ['clean'], function(){
  return gulp.start(['static', 'html','styles','less','icons']);
});

gulp.task('build',function(){

  if (isProduction)
    gulp.start(['build-production']);
  else
     gulp.start(['build-dev']);

});

gulp.task('build-dev',['build-assets'],function(){
    gulp.start(['server']);

});
