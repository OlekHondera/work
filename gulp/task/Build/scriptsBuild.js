import gulp from "gulp";
import esbuild from "gulp-esbuild";

const scriptsBuild = () => {
    return (
        gulp.src("#src/js/index.js")
            .pipe(esbuild({
                    outfile: 'main.js',
                    bundle: true,
                    treeShaking: true,
                    sourcemap: true,
                })
            )
            .pipe(gulp.dest("dist/js"))
    )
}

export default scriptsBuild;