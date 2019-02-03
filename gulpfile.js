const gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create();

// browserSync.init({notify: false});

// запуск сервера
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        port: "7777"
    });

    gulp.watch(['./dist/**/*.html']).on('change', browserSync.reload);
    gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload);

    gulp.watch([
        './src/templates/**/*.html',
        './src/pages/**/*.html'
    ], ['fileinclude']);

    gulp.watch('./src/sass/**/*', ['sass']);
    gulp.watch('./src/js/**/*', ['js']);
    gulp.watch('./src/images/**/*', ['images']);
});

gulp.task('server-prod-prev', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        port: "7777"
    });
});

// компіляція sass/scss в css
gulp.task('sass', function() {
    gulp.src(['./src/sass/**/*.scss', './src/sass/**/*.sass'])
        .pipe(sourcemaps.init())
        .pipe(
            sass({ outputStyle: 'expanded' })
            .on('error', gutil.log)
        )
        .on('error', notify.onError())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('images', function() {
    gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('./dist/images/'));
});

// збірка сторінки з шаблонів
gulp.task('fileinclude', function() {
    gulp.src('./src/pages/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }).on('error', gutil.log))
        .on('error', notify.onError())
        .pipe(gulp.dest('./dist/'))
});

// зтиснення css
gulp.task('minify:css', function() {
    gulp.src(['./src/sass/**/*.scss', './src/sass/**/*.sass'])
        .pipe(sourcemaps.init())
        .pipe(
            sass({ outputStyle: 'expanded' })
                .on('error', gutil.log)
        )
        .on('error', notify.onError())
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 30 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css/'));
});

// зтиснення js
gulp.task('minify:js', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

// видалити папку public
gulp.task('clean', function() {
    return gulp.src('./dist', { read: false }).pipe(clean());
});

// при виклику в терміналі команди gulp, буде запущені задачі 
// server - для запупуску сервера, 
// sass - для компіляції sass в css, тому що браузер 
// не розуміє попередній синтаксис,
// fileinclude - для того щоб з маленьких шаблонів зібрати повну сторінку
gulp.task('default', ['server', 'sass', 'js', 'images', 'fileinclude']);

// при виклику команди gulp production
// будуть стиснуті всі ресурси в папку public
// після чого командою gulp deploy їх можна опублікувати на github
gulp.task('production', ['minify:css', 'minify:js', 'images', 'fileinclude']);

