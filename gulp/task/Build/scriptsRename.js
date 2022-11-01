import gulp from "gulp";
import rename from "gulp-rename";
import babel from "gulp-babel";
import minify from "gulp-uglify"
// import {minify} from "terser";

const scriptsRename = () => {
    return (
        gulp
            .src("dist/js/*.js")
            .pipe(
                babel({
                    presets: ["@babel/preset-env"],
                })
            )
            .pipe(minify())
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest("dist/js/"))
    );
};

export default scriptsRename;