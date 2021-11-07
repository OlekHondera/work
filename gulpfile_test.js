let project_folder = "dist";
let source_folder = "src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        html: source_folder + "/#pug/layout/index.pug",
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
        fonts: source_folder + "/fonts/**/*.ttf",
    },
    watch: {
        html: source_folder + "/#pug/**/*.pug",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
        fonts: source_folder + "/fonts/**/*.ttf",
    },
    clean: "./" + project_folder + "./"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    sync = require('browser-sync').create(),
    gulpPug = require("gulp-pug");

function browserSync() {
    sync.init({
        server: {
            baseDir: "./" + project_folder + "./"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(gulpPug({
            pretty: true   //минификатор
        }))
        .pipe(dest(path.build.html))
        .pipe(sync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);

}

let build = gulp.series(html);
let watch = gulp.parallel(build,watchFiles,browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;