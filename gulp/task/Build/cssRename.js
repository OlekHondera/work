import gulp from 'gulp'
import rename from 'gulp-rename'
import postCssO from 'postcss-csso'
import postcss from 'gulp-postcss'

const stylesRename = () => {
	return gulp
		.src('dist/css/*.css')
		.pipe(postcss([postCssO]))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/css/'))
}

export default stylesRename
