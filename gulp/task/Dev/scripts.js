// Scripts
import gulp from 'gulp'
import esbuild from 'gulp-esbuild'
import sync from 'browser-sync'

// import {minify} from "terser";

const scripts = () => {
	return gulp
		.src([
			'#src/js/index.js'
			// many js
			// '#src/js/index.js',
			// '#src/js/test.js'
		])
		.pipe(
			esbuild({
				outbase: '#src',
				bundle: true,
				treeShaking: true,
				sourcemap: true
			})
		)
		.pipe(gulp.dest('dist'))
		.pipe(sync.stream())
}

export default scripts
