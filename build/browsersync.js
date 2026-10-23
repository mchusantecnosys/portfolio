const browserSync = require('browser-sync').create();
const cp = require('child_process');

const scssPath = '_scss/**/*.scss';
const jsPath = '_scripts/*.js';
const templatePath = [
  '*.html',
  '+(_includes|_layouts)/*.html',
  '*.yml',
  '_data/*.yml',
  '_posts/*',
];

function runJekyll(args, done) {
  const proc = cp.spawn('bundle', ['exec', 'jekyll', ...args], {
    stdio: 'inherit',
    shell: true,
  });

  proc.on('error', () => {
    const fallback = cp.spawn('jekyll', args, { stdio: 'inherit', shell: true });
    fallback.on('error', () => done());
    fallback.on('close', () => done());
  });

  proc.on('close', code => {
    if (code === 0) {
      done();
    } else {
      const fallback = cp.spawn('jekyll', args, {
        stdio: 'inherit',
        shell: true,
      });
      fallback.on('error', () => done());
      fallback.on('close', () => done());
    }
  });
}

module.exports = gulp => {
  const reloadBrowser = done => {
    browserSync.reload();
    done();
  };

  // run `jekyll build`
  gulp.task('jekyll-build', done => {
    runJekyll(['build'], done);
  });

  // run `jekyll build` with _config_dev.yml
  gulp.task('jekyll-dev', done => {
    runJekyll(['build', '--config', '_config.yml,_config_dev.yml'], done);
  });

  // Rebuild Jekyll then reload the page
  gulp.task('jekyll-rebuild', gulp.series(['jekyll-dev', reloadBrowser]));

  gulp.task(
    'serve',
    gulp.series('jekyll-dev', done => {
      browserSync.init(
        {
          server: {
            baseDir: '_site',
          },
          open: false,
        },
        done
      );

      gulp.watch(scssPath, gulp.series(['sass', reloadBrowser]));
      gulp.watch(jsPath, gulp.series(['scripts', reloadBrowser]));
      gulp.watch(templatePath, gulp.task('jekyll-rebuild'));
    })
  );
};
