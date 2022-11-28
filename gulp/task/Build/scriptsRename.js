import gulp from "gulp";
import esbuild from "gulp-esbuild";
import rename from "gulp-rename";
import babel from "gulp-babel";
import minify from "gulp-uglify"
// import {minify} from "terser";

const scriptsRename = () => {
    return (
        gulp
            .src("dist/js/main.js")
            .pipe(esbuild({
                    outfile: 'main.min.js',
                    minify: true,
                })
            )
            .pipe(gulp.dest("dist/js/"))
    );
};

export default scriptsRename;