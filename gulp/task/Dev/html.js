// HTML
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import gulpPug from 'gulp-pug'
import replace from 'gulp-replace'
import sync from 'browser-sync'

const html = () => {
	//Один файл
	return (
		gulp
			.src('#src/#pug/pages/index.pug')
			//Много файлов
			// return gulp.src("src/#pug/pages/*.pug")
			.pipe(
				plumber({
					errorHandler: notify.onError(error => ({
						title: 'Pug',
						message: error.message
					}))
				})
			)
			.pipe(
				gulpPug({
					pretty: true
				})
			)
			.pipe(replace('src="../../', 'src="'))
			.pipe(replace('href="../../', 'href="'))
			.pipe(replace('srcset="../../', 'srcset="'))
			.pipe(replace('url("../../', 'url("../'))
			.pipe(replace(', ../../', ', '))
			.pipe(gulp.dest('dist'))
			.pipe(sync.stream())
	)
}

export default html
