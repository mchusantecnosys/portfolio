const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const prefix = autoprefixer.default || autoprefixer;
const cleanCSS = require('gulp-clean-css');

const scssPath = '_scss/*.scss';
const destPath = '_site/css';

module.exports = gulp => {
  gulp.task('sass', () => {
    return gulp
      .src(scssPath)
      .pipe(
        sass({
          includePaths: ['scss'],
          outputStyle: 'expanded',
          silenceDeprecations: ['legacy-js-api', 'import'],
        }).on('error', sass.logError)
      )
      .pipe(
        prefix({
          overrideBrowserslist: ['last 2 versions'],
          cascade: false,
        })
      )
      .pipe(cleanCSS())
      .pipe(gulp.dest(destPath))
      .pipe(gulp.dest('css'));
  });
};
