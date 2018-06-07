//'use strict';
// generated on 2017-09-13 using generator-cg-gas 3.3.4

var config = require('./build/build.config.js');
var karmaConfig = require('./build/karma.config.js');
var protractorConfig = require('./build/protractor.config.js');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var pkg = require('./package');
var karma = require('karma').server;
var del = require('del');
var _ = require('lodash');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var html2js = require('gulp-html2js');
/* jshint camelcase:false*/
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var modRewrite = require('connect-modrewrite');
var gettext = require('gulp-angular-gettext');
var sriHash = require('gulp-sri-hash');
var pump = require('pump');
var strip = require('gulp-strip-comments');

//update webdriver if necessary, this task will be used by e2e task
gulp.task('webdriver:update', webdriverUpdate);

// run unit tests and watch files
gulp.task('tdd', function(cb) {
    karma.start(_.assign({}, karmaConfig, {
        singleRun: false,
        action: 'watch',
        browsers: ['PhantomJS']
    }), cb);
});

// run unit tests with travis CI
gulp.task('travis', ['build'], function(cb) {
    karma.start(_.assign({}, karmaConfig, {
        singleRun: true,
        browsers: ['PhantomJS']
    }), cb);
});

// optimize images and put them in the dist folder
gulp.task('images', function() {
    console.log(config.images);
    return gulp.src(config.images)
    // .pipe($.imagemin({
    //     progressive: true,
    //     interlaced: true
    // }))
        .pipe(gulp.dest(config.dist + '/assets/images'))
        .pipe($.size({
            title: 'images'
        }));
});

//generate angular templates using html2js
gulp.task('templates', function() {
    return gulp.src(config.tpl)
        .pipe($.changed(config.tmp))
        .pipe(html2js('templates.js', {
            adapter: 'angular',
            name: 'templates',
            base: 'app',
            useStrict: true
        }))
        .pipe($.concat('templates.js'))
        .pipe(gulp.dest(config.tmp))
        .pipe($.size({
            title: 'templates'
        }));
});

//generate css files from scss sources
gulp.task('sass', function() {
    return gulp.src(config.mainScss)
        .pipe(sass())
        .on('error', function(err) {
            console.log(err.message);
        })
        .pipe(gulp.dest(config.tmp))
        .pipe($.size({
            title: 'sass'
        }));
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    /*  gulp.src('app/*.scss')
        .pipe(wiredep())
        .pipe(gulp.dest('app'));
    */
    gulp.src('app/*.html')
        .pipe(wiredep({exclude: ['bootstrap-sass-official']}))
        .pipe(gulp.dest('app'));
});

//build files for creating a dist release
gulp.task('build:dist', ['clean'], function(cb) {
    runSequence([/*'jshint',*/ 'build', 'copy', 'copy:assets', 'images', 'fonts', 'asset:fonts'/*, 'test:unit'*/], 'renameIndex', cb);
});

//build files for development
gulp.task('build', ['clean'], function(cb) {
    runSequence(['sass', 'templates','wiredep'], cb);
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
        'app/vendor/components-font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest(config.dist + '/fonts'));
});

gulp.task('asset:fonts', function() {
    return gulp.src('app/font/**', {
        dot: true
    }).pipe(gulp.dest(config.dist + '/styles/font'))
        .pipe($.size({
            title: 'asset:fonts'
        }));
});

//generate a minified css files, 2 js file, change theirs name to be unique, and generate sourcemaps
gulp.task('html', function() {
    var assets = useref(
        { searchPath: '{build,app}'});
// 'build/tmp/templates.js'
    return gulp.src(config.index)
        .pipe(assets)
        // .pipe(strip())
        //.pipe($.sourcemaps.init())
        .pipe($.if('**/*app.js', $.ngAnnotate()))
        .pipe($.if('**/*.js', $.uglify({
            mangle: true
        })))
        .pipe($.if('*.css', $.csso()))
        .pipe($.if(['**/*app.js', '**/*app.css'], $.header(config.banner, {
            pkg: pkg
        })))
        .pipe($.rev())
        /*.pipe(assets.restore())
        .pipe($.useref())*/
        .pipe($.revReplace())
        .pipe($.if('*.html', $.minifyHtml({
            empty: true
        })))
        //.pipe($.debug({verbose: true}))
        //.pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.dist))
        .pipe($.size({
            title: 'html'
        }));
});

// gulp.task('html', function(cb) {
//     var assets = useref(
//         { searchPath: '{build,app}'});
// // 'build/tmp/templates.js'
//     pump([
//         gulp.src(config.index),
//         assets,
//         //.pipe($.sourcemaps.init())
//         $.if('**/*app.js', $.ngAnnotate()),
//         $.if('**/*.js', $.uglify({
//             mangle: true
//         })),
//         $.if('*.css', $.csso()),
//         $.if(['**/*app.js', '**/*app.css'], $.header(config.banner, {
//             pkg: pkg
//         })),
//         $.rev(),
//         /*.pipe(assets.restore())
//         .pipe($.useref())*/
//         $.revReplace(),
//         $.if('*.html', $.minifyHtml({
//             empty: true
//         })),
//         //.pipe($.debug({verbose: true}))
//         //.pipe($.sourcemaps.write())
//         gulp.dest(config.dist),
//         $.size({
//             title: 'html'
//         })
//     ], cb);
// });

gulp.task('renameIndex',['html'], function () {
    gulp.src('build/dist/index-*.html')
    // .pipe(replace(/=scripts\/app-([^>]*)/g, function (match) {
    //     return match.replace('scripts', s3URL + '/' + s3Folder)
    // }))
    // .pipe(replace(/=scripts\/vendor-([^>]*)/g, function (match) {
    //     return match.replace('scripts', s3URL + '/' + s3Folder)
    // }))
    // .pipe(replace(/=styles\/vendor-([^>]*)/g, function (match) {
    //     return match.replace('scripts', s3URL + '/' + s3Folder)
    // }))
    // .pipe(replace(/=styles\/app-([^>]*)/g, function (match) {
    //     return match.replace('scripts', s3URL + '/' + s3Folder)
    // }))
        .pipe(sriHash({
            algo: 'sha384',
            relative: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('build/dist'));
});

//copy assets in dist folder
gulp.task('copy:assets', function() {
    return gulp.src(config.assets, {
        dot: true
    }).pipe(gulp.dest(config.dist + '/assets'))
        .pipe($.size({
            title: 'copy:assets'
        }));
});

//copy assets in dist folder
gulp.task('copy', function() {
    return gulp.src([
        config.base + '/*',
        '!' + config.base + '/*.html',
        '!' + config.base + '/app*',
        '!' + config.base + '/modules',
        '!' + config.base + '/vendor',
        '!' + config.base + '/test'
    ]).pipe(gulp.dest(config.dist))
        .pipe($.size({
            title: 'copy'
        }));
});

//copy html templates in dist folder
gulp.task('copy:templates', function() {
    return gulp.src([
        config.base + '/modules/**/*.html',
    ]).pipe(gulp.dest(config.dist+'/modules'))
        .pipe($.size({
            title: 'copy modules'
        }));
});


//clean temporary directories
gulp.task('clean', del.bind(null, [config.dist, config.tmp]));

//lint files
gulp.task('jshint', function() {
    return gulp.src(config.js)
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

/* tasks supposed to be public */


//default task
gulp.task('default', ['serve']); //

//run unit tests and exit
gulp.task('test:unit', ['build'], function(cb) {
    karma.start(_.assign({}, karmaConfig, {
        singleRun: true
    }), cb);
});

// Run e2e tests using protractor, make sure serve task is running.
gulp.task('test:e2e', ['webdriver:update'], function() {
    return gulp.src(protractorConfig.config.specs)
        .pipe($.protractor.protractor({
            configFile: 'build/protractor.config.js'
        }))
        .on('error', function(e) {
            throw e;
        });
});

//run the server,  watch for file changes and redo tests.
gulp.task('serve:tdd', function(cb) {
    runSequence(['serve', 'tdd']);
});

gulp.task('pot', function () {
    return gulp.src(['app/**/*.html','app/**/*.js','app/**/*.scss'])
        .pipe(gettext.extract('template.pot', {
            // options to pass to angular-gettext-tools...
        }))
        .pipe(gulp.dest('po/'));
});

gulp.task('translations', function () {
    return gulp.src('po/**/*.po')
        .pipe(gettext.compile({
            // options to pass to angular-gettext-tools...
            // format: 'json'
        }))
        .pipe(gulp.dest('app/'));
});

//run the server after having built generated files, and watch for changes
gulp.task('serve', ['build'], function() {
    browserSync({
        notify: false,
        logPrefix: pkg.name,
        //server: ['build', 'app']
        server: {
            baseDir:  ['build', 'app'],
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });

    gulp.watch(config.html, reload);
    gulp.watch(config.scss, ['sass', reload]);
    gulp.watch(config.js, ['jshint']);
    gulp.watch(config.tpl, ['templates', reload]);
    gulp.watch(config.assets, reload);
});

//run the app packed in the dist folder
gulp.task('serve:dist', ['build:dist'], function() {
    browserSync({
        notify: false,
        server: {
            baseDir:  [config.dist],
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
});
