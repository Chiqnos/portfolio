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
  return gulp.src(['portfolio_theme/assets/scss/**/*.scss', '!portfolio_theme/assets/scss/**/_*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('portfolio_theme/assets/css'))
};

const images = () => {
  return gulp.src('portfolio_theme/assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('portfolio_theme/assets/img'));
};

const scripts = () => {
  return gulp.src(['portfolio_theme/assets/js/**/*.js', '!portfolio_theme/assets/js/jquery.min.js']) // jquery.min.jsを除外
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('portfolio_theme/assets/js'))
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

  return gulp.src('./portfolio_theme/**', { base: './portfolio_theme', buffer: false })
    .pipe(conn.newer(remoteDestination)) // サーバー上のファイルより新しいものだけアップロード
    .pipe(conn.dest(remoteDestination));
};


const watchFiles = () => {
  gulp.watch('portfolio_theme/assets/scss/**/*.scss', gulp.series(compileSass, deploy));
  gulp.watch('portfolio_theme/assets/img/**/*', gulp.series(images, deploy));
  gulp.watch('portfolio_theme/assets/js/**/*.js', gulp.series(scripts, deploy));
  gulp.watch('portfolio_theme/**/*.php', deploy);
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