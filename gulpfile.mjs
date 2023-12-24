import dotenv from 'dotenv';
import gulp from 'gulp';
import sassLibrary from 'sass';
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
  return gulp.src('portfolio/assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/css'))
};

const images = () => {
  return gulp.src('assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'));
};

const scripts = () => {
  return gulp.src('assets/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
};

// FTP接続設定
const ftpConnection = {
  host: ftpHost,
  user: ftpUser,
  password: ftpPassword,
  parallel: 5 // 同時接続数
};

// リモートのパス
const remoteDestination = '/public_html/chiqnos.com/wp-content/themes/portfolio';

const deploy = () => {
  const conn = ftp.create(ftpConnection);

  return gulp.src('portfolio/portfolio_theme/**', { base: 'portfolio/portfolio_theme', buffer: false })
    .pipe(conn.newer(remoteDestination)) // サーバー上のファイルより新しいものだけアップロード
    .pipe(conn.dest(remoteDestination));
};


const watchFiles = () => {
  gulp.watch('assets/scss/**/*.scss', compileSass);
  gulp.watch('assets/img/**/*', images);
  gulp.watch('assets/js/**/*.js', scripts);
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