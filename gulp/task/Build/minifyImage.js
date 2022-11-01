// minifyImages
import gulp from "gulp";
import webp from "gulp-webp";
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from "gulp-imagemin";

const minifyImages = () => {
    return gulp
        .src("#src/images/**/*.{jpg}")
        .pipe(
            webp({
                quality: 70,
            })
        )
        .pipe(gulp.dest("#src/images/"))
        .pipe(gulp.src("#src/images/**/*.{jpg,png,svg}"))
        .pipe(
            imagemin([
                gifsicle({interlaced: true}),
                mozjpeg({quality: 75, progressive: true}),
                optipng({optimizationLevel: 5}),
                svgo({
                    plugins: [
                        {
                            name: "removeViewBox",
                            active: true,
                        },
                        {
                            name: "cleanupIDs",
                            active: false,
                        },
                    ],
                }),
            ])
        )
        .pipe(gulp.dest("dist/images"))
};

export default minifyImages;