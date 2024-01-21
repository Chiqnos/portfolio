import dotenv from 'dotenv';
import gulp from 'gulp';
import * as sassLibrary from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import ftp from 'vinyl-ftp';

dotenv.config();

const ftpHost = process.env.FTP_HOST;
const ftpUser = process.env.FTP_USER;
const ftpPassword = process.env.FTP_PASSWORD;
const sass = gulpSass(sassLibrary);

const compileSass = () => {
  return gulp.src(['portfolio_theme/src/scss/**/*.scss', '!portfolio_theme/src/scss/**/_*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename(function (path) {
      path.basename += '.min'; // Add .min suffix
      path.dirname = ''; // Ignore all directory structure
    }))
    .pipe(gulp.dest('portfolio_theme/dist/css'));
};

const images = () => {
  return gulp.src('portfolio_theme/src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('portfolio_theme/dist/img'));
};

const scripts = () => {
  return gulp.src(['portfolio_theme/src/js/**/*.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('portfolio_theme/dist/js'))
};

// FTP接続設定
const ftpConnection = {
  host: ftpHost,
  user: ftpUser,
  password: ftpPassword,
  parallel: 5 // 同時接続数
};

// リモートのパス
const remoteDestination = '/public_html/chiqnos.com/wp-content/themes/chiqnos';

const deploy = () => {
  const conn = ftp.create(ftpConnection);

  return gulp.src(['./portfolio_theme/**', '!./portfolio_theme/src/**'], { base: './portfolio_theme', buffer: false })
    .pipe(conn.newer(remoteDestination)) // サーバー上のファイルより新しいものだけアップロード
    .pipe(conn.dest(remoteDestination));
};


const watchFiles = () => {
  gulp.watch('portfolio_theme/src/scss/**/*.scss', compileSass);
  gulp.watch('portfolio_theme/src/img/**/*', images);
  gulp.watch('portfolio_theme/src/js/**/*.js', scripts);
};

// 統合されたwatchタスク
const watch = gulp.parallel(watchFiles);


export {
  compileSass as sass,
  images,
  scripts,
  deploy,
  watch,
  watch as default
};