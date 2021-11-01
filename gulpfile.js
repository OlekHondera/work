const gulp = require('gulp');
const del = require('del');
const gulpPug = require('gulp-pug');
const gulpPlumber = require('gulp-plumber');
const gulpSass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const gulpIf = require('gulp-if');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const ttf2woff2 = require('gulp-ttf2woff2');
const sync = require('browser-sync');

// HTML

const html = () => {
    return gulp.src('src/#pug/layout/index.pug')
        // .pipe(gulpPlumber())
        .pipe(gulpPug({
            pretty: true   //минификатор
        }))
        .pipe(replace('src="../../', 'src="'))
        // .pipe(gulpPlumber.stop())
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

exports.html = html;

// Styles

const styles = () => {
    return gulp.src('src/scss/style.scss')
        // .pipe(gulpPlumber())
        .pipe(gulpSass())
        .pipe(postcss([
            require('postcss-media-minmax'),
            require('autoprefixer'),
            require('postcss-sort-media-queries'),
            require('postcss-csso'),
        ]))
        // .pipe(gulpPlumber.stop())
        .pipe(gulp.dest('dist/css'))
        .pipe(sync.stream());
};

exports.styles = styles;

// Scripts

const scripts = () => {
    return gulp.src('src/js/script.js')
        // .pipe(gulpPlumber())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        // .pipe(gulpPlumber.stop())
        .pipe(gulp.dest('dist/js'))
        .pipe(sync.stream());
};

exports.scripts = scripts;

// Sprite
const svgSpriteBuild = () => {
    return gulp.src('src/images/svg_sprite/*.svg')
        // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('dist/images/svg'));

}

exports.sprite = gulp.series (svgSpriteBuild)

// Fonts

const fonts = () => {
  return gulp.src('src/fonts/**/*.ttf')
      .pipe(ttf2woff2())
      .pipe(gulp.dest('src/fonts/'));
}

// Copy

const copy = () => {
    return gulp.src([
        'src/fonts/**/*.woff2',
        'src/images/**/*',
    ], {
        base: 'src'
    })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};

exports.copy = copy;

// Server

const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
};

exports.server = server;

// Watch
const watch = () => {
    gulp.watch('src/#pug/**/*.pug', gulp.series(html));
    gulp.watch('src/scss/**/*.scss', gulp.series(styles));
    gulp.watch('src/js/script.js', gulp.series(scripts));
    gulp.watch([
        'src/fonts/**/*.woff2',
        'src/images/**/*',
    ], gulp.series(copy));
};

exports.watch = watch;

// Default

exports.default = gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
    ),
    gulp.parallel(
        watch,
        server,
    ),
);

// Clean
const clean = () => {
    return del('dist');
};

exports.clean = clean;


//=========================================================================================================

// let isBuildfFlag = false


// svg4everybody
//
// const libs = () => {
//     return gulp.src('node_modules/slick-carousel/slick/slick.min.js')
//         .pipe(concat(libs.js))
//         .pipe(gulp.dest('dist/js/libs/'))
// };
//
// exports.libs = libs;


// SVG_all
//
// const libs = () => {
//     return gulp.src('node_modules/slick-carousel/slick/slick.min.js')
//         .pipe(concat(libs.js))
//         .pipe(gulp.dest('dist/js/libs/'))
// };
//
// exports.libs = libs;


//Build Mode
// function setMode(isBuild) {
//     return cb=>{
//         isBuildfFlag = isBuild;
//         cb();
//     }
// }

// exports.libs = gulp.series (libs)

// const dev = gulp.parallel (html, styles, scripts)
//
// exports.build = gulp.series(
//     gulp.parallel(
//         clean,
//         copy,
//     ),
//     // paths,
//     gulp.parallel(
//         watch,
//         server,
//     ),
// );
// exports.default = gulp.series(clean, html, styles, scripts, copy, server, watch)
//


// gulp.watch('src/images/sprite/*.svg', gulp.series(svgSpriteBuild));
// gulp.watch('src/fonts/**/*.ttf', gulp.series(fonts));
//=========================================================================================================
// const gulp = require('gulp');
// const del = require('del');
// const gulpPug = require('gulp-#pug');
// const gulpPlumber = require('gulp-plumber');
// const gulpSass = require('gulp-sass')(require('sass'));
// const postcss = require('gulp-postcss');
// const babel = require('gulp-babel');
// const gulpUglify = require('gulp-uglify');
// const svgSprite = require('gulp-svg-sprite');
// const svgmin = require('gulp-svgmin');
// const cheerio = require('gulp-cheerio');
// const replace = require('gulp-replace');
// const sync = require('browser-sync').create();

// function fonts() {
//     return gulp.src([
//         'src/fonts/**/*',
//         'src/images/**/*',
//     ], {
//         base: 'src'
//     })
//         .pipe(gulp.dest('dist'))
//         .pipe(sync.stream({
//             once: true
//         }));
// }
//
// function pug2html() {
//     return gulp.src('src/#pug/index/*.#pug')
//         .pipe(gulpPlumber())
//         .pipe(gulpPug({
//             pretty: true   //минификатор
//         }))
//         .pipe(gulpPlumber.stop())
//         .pipe(gulp.dest('dist'))
//         .pipe(sync.stream());
// }
//
// function scss2css() {
//     return gulp.src('src/scss/style.scss')
//         .pipe(gulpPlumber())
//         .pipe(gulpSass())
//         .pipe(postcss([
//             require('postcss-media-minmax'),
//             require('postcss-sort-media-queries'),
//             require('autoprefixer'),
//             // require('postcss-csso'),
//         ]))
//         .pipe(gulpPlumber.stop())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(sync.stream());
// }
//
// function script() {
//     return gulp.src('src/js/script.js')
//         .pipe(gulpPlumber())
//         .pipe(babel({
//             presets: ['@babel/preset-env']
//         }))
//         .pipe(gulpUglify())
//         .pipe(gulpPlumber.stop())
//         .pipe(gulp.dest('dist/js'))
//         .pipe(sync.stream());
// }
//
// function svgSpriteBuild() {
//     return gulp.src('src/images/svg/*.svg')
//         // minify svg
//         .pipe(svgmin({
//             js2svg: {
//                 pretty: true
//             }
//         }))
//         // remove all fill, style and stroke declarations in out shapes
//         .pipe(cheerio({
//             run: function ($) {
//                 $('[fill]').removeAttr('fill');
//                 $('[stroke]').removeAttr('stroke');
//                 $('[style]').removeAttr('style');
//             },
//             parserOptions: {xmlMode: true}
//         }))
//         // cheerio plugin create unnecessary string '&gt;', so replace it.
//         .pipe(replace('&gt;', '>'))
//         // build svg sprite
//         .pipe(svgSprite({
//             mode: {
//                 symbol: {
//                     sprite: "sprite.svg"
//                 }
//             }
//         }))
//         .pipe(gulp.dest('dist/images/svg/sprite'));
// }
//
// function watch() {
//     sync.init({
//         ui: false,
//         notify: false,
//         server: {
//             baseDir: 'dist'
//         }
//     });
//     gulp.watch('src/#pug/**/*.#pug', pug2html);
//     gulp.watch('src/scss/**/*.scss', scss2css);
//     gulp.watch('src/js/script.js', script);
//     gulp.watch('src/images/sprite/*.svg', svgSpriteBuild);
//     gulp.watch('dist/*.html').on('change', sync.reload);
// }
//
// exports.default = gulp.series(clean, pug2html, scss2css, script, svgSpriteBuild, watch);


//==============================================================================================================


// import gulp from 'gulp';
// import del from 'del';
// import gulpPug from 'gulp-#pug';
// import gulpSass from 'gulp-sass';
// import gulpPlumber from 'gulp-plumber';
// import babel from 'gulp-babel';
// import postcss from 'gulp-postcss';
// import replace from 'gulp-replace';
// import terser from 'terser';
// import minmax from 'postcss-media-minmax';
// import sort_media from 'postcss-sort-media-queries';
// import autoprefixer from 'autoprefixer';
// import csso from 'postcss-csso';
// import sync from 'browser-sync';
//
// //Clear
// function clean() {
//     return del('dist');
// }
//
// // HTML
//
// export const html = () => {
//     return gulp.src('src/#pug/index/*.#pug')
//         .pipe(gulpPlumber())
//         .pipe(gulpPug({
//             pretty: true   //минификатор
//         }))
//         .pipe(gulpPlumber.stop())
//         .pipe(gulp.dest('dist'))
//         .pipe(sync.stream());
// };
//
// // // Styles
//
// export const styles = () => {
//     return gulp.src('src/scss/style.scss')
//         .pipe(gulpSass())
//         .pipe(postcss([
//             minmax,
//             autoprefixer,
//             sort_media,
//             csso,
//         ]))
//         .pipe(replace(/\.\.\//g, ''))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(sync.stream());
// };
//
// // Scripts
//
// export const scripts = () => {
//     return gulp.src('src/js/script.js')
//         .pipe(gulpPlumber())
//         .pipe(babel({
//             presets: ['@babel/preset-env']
//         }))
//         .pipe(terser())
//         .pipe(gulpPlumber.stop())
//         .pipe(gulp.dest('dist'))
//         .pipe(sync.stream());
// };
//
// // Copy
//
// export const copy = () => {
//     return gulp.src([
//         'src/fonts/**/*',
//         'src/images/**/*',
//     ], {
//         base: 'src'
//     })
//         .pipe(gulp.dest('dist'))
//         .pipe(sync.stream({
//             once: true
//         }));
// };
//
// // Paths
//
// export const paths = () => {
//     return gulp.src('dist/*.html')
//         .pipe(replace(
//             /(<link rel="stylesheet" href=")styles\/(style.css">)/, '$1$2'
//         ))
//         .pipe(replace(
//             /(<script src=")scripts\/(script.js">)/, '$1$2'
//         ))
//         .pipe(gulp.dest('dist'));
// };
//
// // Server
//
// export const server = () => {
//     sync.init({
//         ui: false,
//         notify: false,
//         server: {
//             baseDir: 'dist'
//         }
//     });
// };
//
// // Watch
//
// export const watch = () => {
//     gulp.watch('src/#pug/**/*.#pug', gulp.series(html, paths));
//     gulp.watch('src/styles/**/*.scss', gulp.series(styles));
//     gulp.watch('src/js/**/*.js', gulp.series(scripts));
//     gulp.watch([
//         'src/fonts/**/*',
//         'src/images/**/*',
//     ], gulp.series(copy));
// };
//
// // Default
//
// export default gulp.series(
//     gulp.parallel(
//         html,
//         styles,
//         scripts,
//         copy,
//     ),
//     paths,
//     gulp.parallel(
//         watch,
//         server,
//     ),
// );
//=======================================================================================================



// Paths

// const paths = () => {
//     return gulp.src('dist/*.html')
//         .pipe(replace(
//             /(<link rel="stylesheet" href=")styles\/(style.css">)/, '$1$2'
//         ))
//         .pipe(replace(
//             /(<script src=")js\/(script.js">)/, '$1$2'
//         ))
//         .pipe(gulp.dest('dist'));
// };
//
// exports.paths = paths;


