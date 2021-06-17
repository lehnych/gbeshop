const { src, dest, watch, parallel, series } = require('gulp');

// -----------------------------------------------------------------

// Список интересных модулей, находиться здесь :)
const scss          = require('gulp-sass'),
    pug             = require('gulp-pug'),  // Для работы с PUG.
    cssnano         = require('cssnano'),   // Для минификации CSS.
    concat          = require('gulp-concat'),   // Для объединения файлов и переименования
    uglify          = require('gulp-uglify-es').default,  // Минификатор JS
    imagemin        = require('gulp-imagemin'), // Сжатие картинок
    webp            = require('gulp-webp'), // Конвертация карток в WEBP
    sourcemaps      = require('gulp-sourcemaps'),
    postcss         = require('gulp-postcss'),  // POST CSS
    autoprefixer    = require('autoprefixer'),  // Добавление вендорных префексов для старых браузеров
    plumber         = require('gulp-plumber'),  // Красивый индикатор ошибок.
    prettify        = require('gulp-html-prettify'),  // Форматер HTML
    autopolyfiller  = require('gulp-autopolyfiller');   // Добавление полифилов для js
    purgecss        = require('@fullhuman/postcss-purgecss'),  // Удаление неиспользуемых свойств CSS.
    gcmq            = require('gulp-group-css-media-queries') // Группировка медиазапросов и их оптимизация.
    del             = require('del');   // Удаление.

// -----------------------------------------------------------------

// PUG
const pugTemplate = function() {
    return src('app/pug/*.pug') // Получаем файлы PUG
        .pipe(pug({pretty: true}))  // Красиво форматирую и перевожу в HTML.
        .pipe(prettify({indent_char: '  ', indent_size: 1})) // Правила форматирования
        .pipe(dest('app'))
}

// Working with css libraries.
/*const stylesLibs = function() {
    return src([
        // подключение сторонних бибилотек сss
        'node_modules/normalize.css/normalize.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/aos/dist/aos.css',
        'node_modules/swiper/swiper-bundle.css'
    ])
        .pipe(plumber())
        .pipe(concat('_index.scss'))
        .pipe(dest('app/scss/vendor'))
}*/

// SCSS
const styles = function() {
    let plugins = [
        autoprefixer({overrideBrowserslist: ['last 8 version'], grid: true}),
        //purgecss({content: ['dist/*.html']}), // Очистка от неиспользуемых css правил (Очиста от мусора)
        cssnano() // Минификация css
    ]
    return src('app/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber()) // Удобный интерфейс обработки ошибок.
        .pipe(scss({outputStyle: 'compressed'}))  // Минифицированный CSS
        .pipe(postcss(plugins)) // Подключаем плагины для post css
        .pipe(concat('style.min.css'))  // Переименоваваем
        .pipe(gcmq())   // Группирую медиазапросы (Крутая штука)
        .pipe(sourcemaps.write(dest('app/css')))
        .pipe(dest('app/css'))
}

// JavaScript
const scripts = function() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'node_modules/picturefill/dist/picturefill.js',
        'app/vendor/custom-file-input/js/custom-file-input.js',
        'node_modules/aos/dist/aos.js',
        'node_modules/swiper/swiper-bundle.js',
        'app/js/source/main.js',
    ])
        .pipe(plumber())
        .pipe(concat('script.min.js'))
        // .pipe(autopolyfiller('main.min.js'))
        .pipe(uglify()) // Минификация.
        .pipe(dest('app/js'))
}

// Images
const images = function() {
    return src('app/img/**/*')
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        // .pipe(webp()) - Конвертация в WebP, то о чем я говорил на вебинаре.
        .pipe(dest('app/img'))
}

// -----------------------------------------------------------------


// Creating a build for the customer.
const build = function() {
    return src([
        'app/*.html',
        'app/css/style.min.css',
        'app/js/script.min.js',
        'app/fonts/**/*.*',
        'app/img/**/*.*',
    ], {base: 'app'})
    .pipe(dest('dist'))
}

// Clean Dist
function cleanDist() {
    return del('dist')
}

// Watch
const watching = function() {
    watch(['app/pug/**/*.pug'], pugTemplate)
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/js/source/*.js'], scripts)
}

// User script.
exports.default = parallel(scripts, /*stylesLibs,*/ styles, pugTemplate, watching);
exports.build = series(cleanDist, images, build);
