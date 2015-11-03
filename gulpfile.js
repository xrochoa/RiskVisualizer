// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cdnizer = require("gulp-cdnizer");
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');


// Lint Task
gulp.task('lint', function () {
    return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//  Minify JS
gulp.task('scripts', function () {
    return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest('dist/js'));
});

// Minify CSS
gulp.task('css', function () {
    return gulp.src('css/*.css')
    .pipe(minifyCss())
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest('dist/css'));
});

// Copy images
gulp.task('images', function () {
    return gulp.src('img/*.png')
    .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
    }))
    .pipe(gulp.dest('dist/img'));
});

// Copy favicon
gulp.task('fav', function () {
    return gulp.src('favicon.ico')
    .pipe(gulp.dest('dist'));
});

//Replacing local links with CDNs and minify index.html
gulp.task('cdn', function () {
    return gulp.src("index.html")
    .pipe(cdnizer([
    {
        file: 'bower_components/angular/angular.js',
        package: 'angular',
        cdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/${ version }/angular.min.js'
    },
    {
        file: 'bower_components/bootstrap/dist/css/bootstrap.css',
        package: 'bootstrap',
        cdn: 'https://maxcdn.bootstrapcdn.com/bootstrap/${ version }/css/bootstrap.min.css'
    },
            {
        file: 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        package: 'angular-bootstrap',
        cdn: 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/${ version }/ui-bootstrap-tpls.min.js'
    },       
    {
        file: 'css/style.css',
        cdn: 'css/style.min.css'
    },
    {
        file: 'js/app.js',
        cdn: 'js/app.min.js'
    }
    ]))
.pipe(minifyHTML())
.pipe(gulp.dest("dist"));


});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('index.html', ['cdn']);
    gulp.watch('content/*.html', ['minify-html']);

});

// Default Task
gulp.task('default', ['lint', 'scripts', 'css', 'cdn', 'images', 'fav',
    'watch']);
