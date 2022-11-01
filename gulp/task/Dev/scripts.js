// Scripts
import gulp from "gulp";
import esbuild from "gulp-esbuild";
import sync from "browser-sync";

// import {minify} from "terser";

const scripts = () => {
    return (
        gulp.src([
            "#src/js/index.js",
        ])
            .pipe(esbuild({
                    outfile: 'index.js',
                    bundle: true,
                    treeShaking: true,
                    sourcemap: true,
                })
            )
            .pipe(gulp.dest("dist/js"))
            .pipe(sync.stream())
    )
}

export default scripts;