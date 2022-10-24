import gulp from "gulp";
import esbuild from "gulp-esbuild";

const scriptsBuild = () => {
    return (
        gulp.src([
            "src/js/index.js",
        ])
            .pipe(esbuild({
                    outfile: 'index.js',
                    bundle: true,
                    treeShaking: true,
                    // minify: true,
                    sourcemap: true,
                })
            )
            //.babel!!!!!!!! ДОДЕЛАТЬ!!!!!!
            .pipe(gulp.dest("dist/js"))
    )
}

export default scriptsBuild;