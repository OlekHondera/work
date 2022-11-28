import gulp from "gulp";
import esbuild from "gulp-esbuild";
import rename from "gulp-rename";
// import babel from "gulp-babel";
// import minify from "gulp-uglify"
// import {minify} from "terser";
const scriptsRename = () => {
    return (
        gulp.src([
                "dist/js/index.js"
                // many js
                // "dist/js/index.js",
                // "dist/js/test.js",
                // "dist/js/test2.js"
            ])
            .pipe(esbuild({
                    outbase: 'dist',
                    minify: true,
                })
            )
            .pipe(rename({ suffix: ".min" }))
            .pipe(gulp.dest("dist"))
    )
        ;
};

export default scriptsRename;