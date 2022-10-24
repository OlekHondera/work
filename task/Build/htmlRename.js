//Минификация html
import gulp from "gulp";
import rename from "gulp-rename";

const htmlRename = () => {
    return (
        gulp
            .src("dist/index.html")
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest("dist"))
    );
};

export default htmlRename;