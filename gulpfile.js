import gulp from "gulp";
import del from "del";
import gulpPug from "gulp-pug";
import gulpSass from "gulp-sass";
import sass from "sass";
import postcss from "gulp-postcss";
import postWebp from "postcss-webp";
import minmax from "postcss-media-minmax";
import sortMedia from "postcss-sort-media-queries";
import autoprefixer from "autoprefixer";
import postCsso from "postcss-csso";
import babel from "gulp-babel";
import concat from "gulp-concat";
import terser from "gulp-terser";
import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";
import webp from "gulp-webp";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";
import sync from "browser-sync";
import sourcemaps from "gulp-sourcemaps";
// import gulpIf from "gulp-if";
// import ttf2woff2 from "gulp-ttf2woff2";

const realGulpSass = gulpSass(sass);

// HTML

export const html = () => {
  return gulp
    .src("src/#pug/layout/index.pug")
    .pipe(
      gulpPug({
        pretty: true,
      })
    )
    .pipe(replace('src="../../', 'src="'))
    .pipe(replace('href="../../', 'href="'))
    .pipe(replace('srcset="../../', 'srcset="'))
    .pipe(replace(", ../../", ", "))
    .pipe(gulp.dest("dist"))
    .pipe(sync.stream());
};

// Styles

export const styles = () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(realGulpSass())
    .pipe(replace("url(../../", 'url("../'))
    .pipe(postcss([minmax, postWebp, autoprefixer, sortMedia, postCsso]))
    .pipe(gulp.dest("dist/css"))
    .pipe(sync.stream());
};

// Scripts

export const scripts = () => {
  return (
    gulp
      .src(["src/js/components/*.js", "src/js/script.js"])
      .pipe(sourcemaps.init())
      //ПРИ КОНКАТЕ НЕ РАБОТАЕТ JS!!!!!
      .pipe(concat("main.js"))
      .pipe(gulp.dest("src/js/concat"))
      .pipe(
        babel({
          presets: ["@babel/preset-env"],
        })
      )
      .pipe(terser())
      .pipe(sourcemaps.write("maps"))
      .pipe(gulp.dest("dist/js"))
      .pipe(sync.stream())
  );
};

// Images

export const images = () => {
  return gulp
    .src("src/images/**/*.{jpg,png}")
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(gulp.dest("src/images/"))
    .pipe(gulp.src("src/images/**/*.{jpg,png,svg}"))
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 75, progressive: true }),
        optipng({ optimizationLevel: 5 }),
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
    .pipe(sync.stream());
};

// Copy

export const copy = () => {
  return gulp
    .src(
      [
        "src/fonts/**/*.{woff,woff2}",
        "src/images/**/*.{webp,avif}",
        "src/video/**/*.{webm,mp4}",
      ],
      {
        base: "src",
      }
    )
    .pipe(gulp.dest("dist"))
    .pipe(
      sync.stream({
        once: true,
      })
    );
};

// Server

export const server = () => {
  sync.init({
    ui: false,
    notify: false,
    server: {
      baseDir: "dist",
    },
    browser: "google chrome",
  });
};

// Watch

export const watch = () => {
  gulp.watch("src/#pug/**/*.pug", gulp.series(html));
  gulp.watch("src/scss/**/*.scss", gulp.series(styles));
  gulp.watch("src/js/script.js", gulp.series(scripts));
  gulp.watch("src/images/**/*.{jpg,png,svg}", gulp.series(images));
  gulp.watch(
    [
      "src/fonts/**/*.{woff,woff2}",
      "src/images/**/*.{webp,avif}",
      "src/video/**/*.{webm,mp4}",
    ],
    gulp.series(copy)
  );
};

//LibsCopy

export const libsCopy = () => {
  return gulp
    .src(["src/js/libs/*.js"], {
      base: "src",
    })
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("dist"));
};

// Default

export default gulp.series(
  gulp.parallel(images, html, styles, scripts, copy, libsCopy),
  gulp.parallel(watch, server)
);
//===============================================================

// Clean

export const clean = () => {
  return del("dist");
};

//===============================================================

// Sprite

export const SpriteSVG = () => {
  return (
    gulp
      .src("src/images/svg_sprite/*.svg")
      // minify svg
      .pipe(
        svgmin({
          js2svg: {
            pretty: true,
          },
        })
      )
      // remove all fill, style and stroke declarations in out shapes
      .pipe(
        cheerio({
          run: function ($) {
            $("[fill]").removeAttribute("fill");
            $("[stroke]").removeAttribute("stroke");
            $("[style]").removeAttribute("style");
          },
          parserOptions: { xmlMode: true },
        })
      )
      .pipe(replace("&gt;", ">"))
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: "sprite.svg",
            },
          },
        })
      )
      .pipe(gulp.dest("dist/images/svg"))
  );
};

//========================JS Library=============================

// Svg4EveryBody

export const svg4everybody = () => {
  // return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
  return gulp
    .src("node_modules/svg4everybody/dist/svg4everybody.min.js")
    .pipe(concat("svg4everybody.js"))
    .pipe(gulp.dest("src/js/libs"));
};

// Swiper Slider

export const swiperBundle = () => {
  return gulp
    .src("node_modules/swiper/swiper-bundle.js")
    .pipe(concat("swiperBundle.js"))
    .pipe(gulp.dest("src/js/libs"));
};

//Модульное подключение

// export const swiperPart = () => {
//   return gulp
//     .src(["node_modules/swiper/core/core.js", "node_modules/swiper/swiper-bundle.js"])
//     .pipe(concat("swiperPartials.js"))
//     .pipe(gulp.dest("src/js/libs"));
// };

// JQuery

export const jquery = () => {
  return gulp
    .src("node_modules/jquery/dist/jquery.min.js")
    .pipe(concat("jquery.js"))
    .pipe(gulp.dest("src/js/libs"));
};
// Clean
//
// export const cleanlibs = () => {
//   return del("src/js/libs");
// };

//
// export
// createLibs
// gulp.series(
//     gulp.parallel(cleanlibs, svg4everybody, jquery, slick)
// );

// // Slick Slider
//
// export const slick = () => {
//   return gulp
//     .src("node_modules/slick-carousel/slick/slick.js")
//     .pipe(concat("slick.js"))
//     .pipe(gulp.dest("src/js/libs"));
// };

// // Libs
//
// export const libs = () => {
//     // return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
//     return gulp.src('node_modules/svg4everybody/dist/svg4everybody.min.js')
//         .pipe(concat('libs.js'))
//         .pipe(gulp.dest('src/js/libs'))
// };
