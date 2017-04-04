/**
 *
 * Build proccess Steps:
 * 1. Clean /_build folder
 * 2. Compile SASS, minify and uncss the compiled css
 * 3. Copy and minimize images
 * 4. Minify and copy all html inside $templateCache
 * 5. Build index.html
 * 6. Minify and copy all the JS files
 * 7. Copy fonts
 * 8. Show the totla build size
 * 
 */
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    historyApiFallback = require('connect-history-api-fallback')


// optimize images
gulp.task('images', function() {
    return gulp.src('./assets/images/**/*')
        .pipe($.changed('./_build/assets/images'))
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./_build/assets/images'));
});

// browser-sync task, looking for the compiled css
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./",
            middleware: [ historyApiFallback() ]
        }
    });
});

// minify JS
gulp.task('minify-js', function() {
    gulp.src(['./assets/js/*.js'])
        .pipe($.uglify())
        .pipe(gulp.dest('./_build/assets'));
});

// minify CSS
gulp.task('minify-css', function() {
    gulp.src(['./assets/styles/**/*.css', '!./assets/styles/**/*.min.css'])
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.minifyCss({ keepBreaks: true }))
        .pipe(gulp.dest('./assets/styles/'))
        .pipe(gulp.dest('./_build/assets/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
    var opts = {
        comments: true,
        spare: true,
        conditionals: true
    };

    gulp.src('./*.html')
        .pipe($.minifyHtml(opts))
        .pipe(gulp.dest('./_build/'));
});

// copy fonts from an external module (Bower, Node)
gulp.task('fonts', function() {
    gulp.src(['./assets/fonts/**/*.{ttf,woff,eof,eot,svg}', './node_modules/bootstrap-sass/assets/fonts/**/*', './bower_components/font-awesome/fonts/*'])
        .pipe($.changed('./_build/assets/fonts'))
        .pipe(gulp.dest('./_build/assets/fonts'));
});

// start webserver
gulp.task('server', function(done) {
    return browserSync({
        server: {
            baseDir: './'
        }
    }, done);
});

// start webserver from _build folder to check if everything is ok for production
gulp.task('server-build', function(done) {
    return browserSync({
        server: {
            baseDir: './_build/'
        }
    }, done);
});

// delete build folder
gulp.task('clean:build', function(cb) {
    del([
        './_build/'
        // if we don't want to clean a file we can use a negative pattern here
        //'!dist/mobile/deploy.json'
    ], cb);
});

// concat files
gulp.task('concat', function() {
    gulp.src('./assets/js/*.js')
        .pipe($.concat('scripts.js'))
        .pipe(gulp.dest('./_build/assets/js/'));
});

// SASS task, will run whenever a SCSS changes 
// BrowserSync will reload the page automatically
gulp.task('sass', function() {
    return gulp.src('assets/styles/style.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            style: 'expanded',
            includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets', '.bower_components/font-awesome/scss']
        }))
        .on('error', $.notify.onError({
            title: 'SASS Failed',
            message: 'Error(s) on compile!'
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('assets/styles'))
        .pipe(reload({
            stream: true
        }))
        .pipe($.notify({
            message: 'Style compile task concluded'
        }));
});

// SASS build task
gulp.task('sass:build', function() {
    var s = $.size();

    return gulp.src('./assets/styles/style.scss')
        .pipe($.sass({
            style: 'compact',
            includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']
        }))
        .pipe($.autoprefixer('last 3 version'))
        .pipe($.uncss({
            html: ['./index.html', './app/components/**/*.html'],
            ignore: [
                '.index',
                '.slick'
            ]
        }))
        .pipe($.minifyCss({
            keepBreaks: true,
            aggressiveMerging: false,
            advanced: false
        }))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('_build/assets/css'))
        .pipe(s)
        .pipe($.notify({
            onLast: true,
            message: function() {
                return 'Total size of CSS ' + s.prettySize;
            }
        }));
});

// BUGFIX: warning: possible EventEmitter memory leak detected. 11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;

// build index.html
// concat script/css
gulp.task('usemin', function() {
    return gulp.src('./index.html')
        // add templates path
        .pipe($.htmlReplace({
            'templates': '<script type="text/javascript" src="js/templates.js"></script>'
        }))
        .pipe($.usemin({
            css: [$.minifyCss(), 'concat'],
            libs: [$.uglify()],
            nonangularlibs: [$.uglify()],
            angularlibs: [],
            appcomponents: [$.uglify()],
            mainapp: [$.uglify()]
        }))
        .pipe(gulp.dest('./_build/'));
});

// create a templateCache of all HTML
gulp.task('templates', function() {
    return gulp.src([
            './**/*.html',
            '!bower_components/**/*.*',
            '!node_modules/**/*.*',
            '!_build/**/*.*'
        ])
        .pipe($.minifyHtml())
        .pipe($.angularTemplatecache({
            module: 'myBoilerplate'
        }))
        .pipe(gulp.dest('_build/js'));
});

// reload all the navigatores
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// calculate total build folder size
gulp.task('build:size', function() {
    var s = $.size();

    return gulp.src('./_build/**/*.*')
        .pipe(s)
        .pipe($.notify({
            onLast: true,
            message: function() {
                return 'Total build folder size ' + s.prettySize;
            }
        }));
});

gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});


// default task executed by the command `gulp`
// this task will execute BrowserSync & will use Gulp to watch the files.
// whenever a file changes, an event will be emited to BrowserSync with the file directory.
gulp.task('default', ['browser-sync', 'sass', 'minify-css', 'set-dev-node-env'], function() {
    gulp.watch('styles/*.css', function(file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    gulp.watch(['*.html', 'app/components/**/*.html'], ['bs-reload']);
    gulp.watch(['app/*.js', 'app/components/**/*.js', 'assets/js/*.js'], ['bs-reload']);
    gulp.watch('assets/styles/**/*.scss', ['sass', 'minify-css']);
});


/**
 * Build proccess Steps:
 * 1. Clean /_build folder
 * 2. Compile SASS, minify and uncss the compiled css
 * 3. Copy and minimize images
 * 4. Minify and copy all html inside $templateCache
 * 5. Build index.html
 * 6. Minify and copy all the JS files
 * 7. Copy fonts
 * 8. Show the totla build size
 * 
 */
gulp.task('build', function(callback) {
    runSequence(
        'clean:build',
        'sass:build',
        'images',
        'templates',
        'usemin',
        'fonts',
        'build:size',
        'set-prod-node-env',
        callback);
});