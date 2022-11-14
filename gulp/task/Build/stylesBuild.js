//Build css

// Styles
import gulp from "gulp";
import gulpSass from "gulp-sass";
import sass from "sass";

const realGulpSass = gulpSass(sass);
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import replace from "gulp-replace";
import postcss from "gulp-postcss";
import minmax from "postcss-media-minmax";
import pxToRem from "postcss-pxtorem";
import postWebp from "postcss-webp";
import autoprefixer from "autoprefixer";
import sortMedia from "postcss-sort-media-queries";

const stylesBuild = () => {
    return gulp
        .src("#src/scss/main.scss", {sourcemaps: true})
        .pipe(
            plumber({
                errorHandler: notify.onError((error) => ({
                    title: "Styles",
                    message: error.message,
                })),
            })
        )
        .pipe(realGulpSass())
        .pipe(replace('url("../../', 'url("../'))
        .pipe(replace("url(../../", "url(../"))
        .pipe(replace('content: "../../images', 'content: "../images'))
        .pipe(replace('content: "../../../images', 'content: "../../images'))
        .pipe(
            postcss([
                minmax,
                pxToRem({
                    propList: [
                        "font-size",
                        // "max-width",
                        // "min-width",
                        // "padding",
                        // "margin",
                        // "margin-top",
                        // "margin-right",
                        // "margin-left",
                        // "margin-bottom",
                        // "width",
                        // "height",
                    ],
                    selectorBlackList: [],
                }),
                postWebp,
                autoprefixer,
                sortMedia,
            ])
        )
        .pipe(gulp.dest("dist/css", {sourcemaps: true}))
};

export default stylesBuild;