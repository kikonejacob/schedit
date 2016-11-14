/**
 * School edit 2016
 *
 * Build automation
 *
 * gulp build --type production
 */


var gulp = require('gulp');
var eslint=require('gulp-eslint');
var merge = require('merge-stream');
var path = require('path');
var gutil = require('gulp-util');

var less = require('gulp-less');
var $ = require('gulp-load-plugins')();
var del = require('del');
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var postcss = require('gulp-postcss');
var src = 'src/';
var dist = 'dist/';
var nodeModulePath='node_modules/';
var exec = require('child_process').exec;

gutil.log('SCHOOL EDIT 2016');
gutil.log('Gulp is used to build the project.');

////////////////////////////////////////
// Obsolete  tasks
//////////////////////////////////////////

gulp.task('less', function () {
    return gulp.src(src+'/less/**/*.less')
    .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});


////////////////////////////////////////////////////
// End of Obsolete tasks
////////////////////////////////////////////////////


/**  Run the server through npm start */
gulp.task('start-server', function (cb) {
    exec('npm start', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

/**  Run the server through npm start */
gulp.task('webpack-compile', function (cb) {
    process.env.NODE_ENV=$.util.env.type;
    exec('npm run compile-production', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
/** Transfert font icons to dist directory */
gulp.task('icons', function() {
    var fontAwsome= gulp.src(nodeModulePath + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest(dist+'fonts'));
    var bootstrap= gulp.src(nodeModulePath + '/bootstrap/fonts/**.*')
        .pipe(gulp.dest(dist+'fonts'));
    return merge(bootstrap,fontAwsome);
});

/** Compilte application Stylessheets */
gulp.task('styles', function () {
    return gulp.src('./src/css/*.css').pipe(
        postcss([
            require('precss')({ /* options */ })
        ])
    ).pipe(
        gulp.dest(dist+'css')
    );
});
/** Include index.html */
gulp.task('html', function() {
    return gulp.src(src + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }));

});
/** Include static files */
gulp.task('static', function() {
    return gulp.src(src + 'static/**/*')
    .pipe($.size({ title : 'static' }))
    .pipe(gulp.dest(dist + 'static/'));
});

/** Lint the code  */
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


/**  Watch for [html,css] change */
gulp.task('watch', function() {
  //gulp.watch(src + 'stylus/*.styl', ['styles']);
    gulp.watch(src + 'css/*.css', ['styles']);
    gulp.watch(src + 'index.html', ['html']);
  //gulp.watch(src + 'app/**/*.js', ['webpack-compile']);
});
/** Clean distribution directory */
gulp.task('clean', function(cb) {
    return del([dist], cb);
});


// Clean dist directoryt and start building project
gulp.task('build-assets', ['clean'], function(){
    return gulp.start(['static', 'html','styles','less','icons']);
});

/** start development tasks */
gulp.task('build-dev',['build-assets'],function(){
    gulp.start(['start-server']);

});
/** start production tasks */
gulp.task('build-production',['build-assets','lint'],function(){
    gulp.start(['webpack-compile']);

});

gulp.task('build',function(){
    if (isProduction)
        gulp.start(['build-production']);
    else
     gulp.start(['build-dev', 'watch']);

});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build']);
