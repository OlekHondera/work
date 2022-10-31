import gulp from "gulp";
import sync from "browser-sync";
import replace from "gulp-replace";
import cheerio from "gulp-cheerio";
import svgMin from "gulp-svgmin";
import svgSprite from "gulp-svg-sprite";
import babel from "gulp-babel";
import concat from "gulp-concat";
import {deleteAsync} from "del";
import minify from "gulp-uglify";

//task
import html from "./task/Dev/html.js";
import htmlBuild from "./task/Build/htmlBuild.js";
import htmlRename from "./task/Build/htmlRename.js";
import styles from "./task/Dev/style.js";
import stylesBuild from "./task/Build/stylesBuild.js";
import stylesRename from "./task/Build/cssRename.js";
import scripts from "./task/Dev/scripts.js";
import scriptsBuild from "./task/Build/scriptsBuild.js";
import scriptsRename from "./task/Build/scriptsRename.js";
import minifyImages from "./task/Build/minifyImage.js";


// Copy

const copy = () => {
    return gulp
        .src(
            [
                "src/fonts/**/*.{woff,woff2}",
                "src/images/**/*.{webp,avif,jpg,png,svg}",
                "src/video/**/*.{webm,mp4}",
            ],
            {
                base: "src",
            }
        )
        .pipe(gulp.dest("dist"))
        .pipe(
            sync.stream({
                once: true,
            })
        );
};

// Server

const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: "dist",
        },
        browser: "google chrome",
    });
};

// Watch

const watch = () => {
    gulp.watch("src/#pug/**/*.pug", gulp.series(html));
    gulp.watch("src/modules/*.pug", gulp.series(html));
    gulp.watch("src/scss/main.scss", gulp.series(styles));
    gulp.watch("src/scss/*.scss", gulp.series(styles));
    gulp.watch("src/scss/**/*.scss", gulp.series(styles));
    gulp.watch("src/js/index.js", gulp.series(scripts));
    gulp.watch("src/js/components/*.js", gulp.series(scripts));
    gulp.watch("src/components/*.pug", gulp.series(html));
    gulp.watch("src/components/*.scss", gulp.series(styles));
    gulp.watch("src/components/*.js", gulp.series(scripts));
    gulp.watch("src/images/**/*.{jpg,png,svg}", gulp.series(copy));
    gulp.watch(
        [
            "src/fonts/**/*.{woff,woff2}",
            "src/images/**/*.{webp,avif}",
            "src/video/**/*.{webm,mp4}",
        ],
        gulp.series(copy)
    );
};

export const clean = () => {
    return deleteAsync("dist");
};

const dev = gulp.series(html, styles, scripts);
const build = gulp.series(htmlBuild, stylesBuild, scriptsBuild, minifyImages);

export default gulp.series(clean,
    gulp.parallel(dev, copy),
    gulp.parallel(watch, server))

export const Build = gulp.series(clean,
    gulp.parallel(build, copy),
    gulp.parallel(watch, server))

export const minifyBuild = gulp.series(htmlRename, stylesRename, scriptsRename)
//===============================================================================================================
//===============================================================================================================
//===============================================================================================================

export const svg4everybody = () => {
    // return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
    return gulp
        .src("node_modules/svg4everybody/dist/svg4everybody.min.js")
        .pipe(concat("svg4everybody.js"))
        .pipe(gulp.dest("src/js/libs"));
};

export const SpriteSVG = () => {
    return (
        gulp
            .src("src/images/svg_sprite/*.svg")
            // minify svg
            .pipe(
                svgMin({
                    js2svg: {
                        pretty: true,
                    },
                })
            )
            // remove all fill, style and stroke declarations in out shapes
            .pipe(
                cheerio({
                    run: function ($) {
                        $("[fill]").removeAttribute("fill");
                        $("[stroke]").removeAttribute("stroke");
                        $("[style]").removeAttribute("style");
                    },
                    parserOptions: {xmlMode: true},
                })
            )
            .pipe(replace("&gt;", ">"))
            .pipe(
                svgSprite({
                    mode: {
                        symbol: {
                            sprite: "sprite.svg",
                        },
                    },
                })
            )
            .pipe(gulp.dest("dist/images/svg"))
    );
};

// Swiper Slider

export const swiperBundle = () => {
    return gulp
        .src("node_modules/swiper/swiper-bundle.js")
        .pipe(concat("swiperBundle.js"))
        .pipe(gulp.dest("src/js/libs"));
};

//Модульное подключение
export const swiperPart = () => {
    return gulp
        .src([
            "node_modules/swiper/core/core.js",
            // "node_modules/swiper/modules/pagination/pagination.js",
            "node_modules/swiper/modules/navigation/navigation.js",
            "node_modules/swiper/modules/grid/grid.js",
        ])
        .pipe(concat("swiperPartials.js"))
        .pipe(gulp.dest("src/js/libs"));
};

// JQuery
export const jquery = () => {
    return gulp
        .src("node_modules/jquery/dist/jquery.min.js")
        .pipe(concat("jquery.js"))
        .pipe(gulp.dest("src/js/libs"));
};

//LibsCopy

export const libsCopy = () => {
    return gulp
        .src(["src/js/libs/*.js"], {
            base: "src",
        })
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(minify())
        .pipe(gulp.dest("dist"));
};