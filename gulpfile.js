import gulp from 'gulp';
import del from 'del';
import gulpPug from 'gulp-pug';
import gulpSass from "gulp-sass";
import sass from "sass";
const realGulpSass = gulpSass(sass);
import postcss from 'gulp-postcss';
import postWebp from 'postcss-webp';
import minmax from 'postcss-media-minmax';
import sortMedia from 'postcss-sort-media-queries';
import autoprefixer from 'autoprefixer';
import postCsso from 'postcss-csso';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import terser from 'gulp-terser';
import gulpIf from 'gulp-if';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import webp from 'gulp-webp';
import webp_html from 'gulp-webp-html-nosvg';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';
import ttf2woff2 from 'gulp-ttf2woff2';
import sync from 'browser-sync';

// HTML

export const html = () => {
    return gulp.src('src/#pug/layout/index.pug')
        .pipe(gulpPug({
            pretty: true   //минификатор
        }))
        // Подключение webp в html
        .pipe(webp_html())
        .pipe(replace('src="../../', 'src="'))
        .pipe(replace('srcset="../../', 'srcset="'))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};


// Styles

export const styles = () => {
    return gulp.src('src/scss/style.scss')
        .pipe(realGulpSass())
        .pipe(postcss([
            minmax,
            postWebp,
            autoprefixer,
            sortMedia,
            postCsso,
        ]))
        .pipe(gulp.dest('dist/css'))
        .pipe(sync.stream());
};

// Scripts

export const scripts = () => {
    return gulp.src('src/js/script.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'))
        .pipe(sync.stream());
};

// Sprite

export const SpriteSVG = () => {
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
                $('[fill]').removeAttribute('fill');
                $('[stroke]').removeAttribute('stroke');
                $('[style]').removeAttribute('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('dist/images/svg'));

}

// Images

export const images = () => {
    return gulp.src('src/images/**/*.{jpg,png}')
        .pipe(webp({
            quality: 70
        }))
        .pipe(gulp.dest('src/images/'))
        .pipe(gulp.src('src/images/**/*.{jpg,png,svg}'))
        .pipe(imagemin([
            gifsicle({interlaced: true}),
            mozjpeg({quality: 75, progressive: true}),
            optipng({optimizationLevel: 5}),
            svgo({
                plugins: [
                    {
                        name: 'removeViewBox',
                        active: true
                    },
                    {
                        name: 'cleanupIDs',
                        active: false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/images'))
        .pipe(sync.stream());
}

// Copy

export const copy = () => {
    return gulp.src([
        'src/fonts/**/*.woff2',
        'src/images/**/*.{webp,avif}'
    ], {
        base: 'src'
    })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};

// Server

export const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
};

// Watch

export const watch = () => {
    gulp.watch('src/#pug/**/*.pug', gulp.series(html));
    gulp.watch('src/scss/**/*.scss', gulp.series(styles));
    gulp.watch('src/js/script.js', gulp.series(scripts));
    gulp.watch('src/images/**/*.{jpg,png,svg}', gulp.series(images));
    // gulp.watch('src/images/svg_sprite/*.svg', gulp.series(SpriteSVG));
    gulp.watch([
        'src/fonts/**/*.woff2',
        'src/images/**/*.{webp,avif}'
    ], gulp.series(copy));
};

// Default

export default gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        images,
        // SpriteSVG,
        copy,
    ),
    gulp.parallel(
        watch,
        server,
    ),
);

// Clean
export const clean = () => {
    return del('dist');
}
