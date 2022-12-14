// Styles
import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import sass from 'sass'

const realGulpSass = gulpSass(sass)
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import replace from 'gulp-replace'
import postcss from 'gulp-postcss'
import minmax from 'postcss-media-minmax'
import sync from 'browser-sync'

const styles = () => {
	return gulp
		.src('#src/scss/*.scss', { sourcemaps: true })
		.pipe(
			plumber({
				errorHandler: notify.onError(error => ({
					title: 'Styles',
					message: error.message
				}))
			})
		)
		.pipe(realGulpSass())
		.pipe(replace('url("../../', 'url("../'))
		.pipe(replace('url(../../', 'url(../'))
		.pipe(replace('content: "../../images', 'content: "../images'))
		.pipe(replace('content: "../../../images', 'content: "../../images'))
		.pipe(postcss([minmax]))
		.pipe(gulp.dest('dist/css', { sourcemaps: true }))
		.pipe(sync.stream())
}
export default styles
