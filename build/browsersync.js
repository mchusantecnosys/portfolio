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
  let doneCalled = false;
  const finish = () => {
    if (!doneCalled) {
      doneCalled = true;
      done();
    }
  };

  const command = ['bundle', 'exec', 'jekyll', ...args].join(' ');
  const proc = cp.spawn(command, {
    stdio: 'inherit',
    shell: true,
  });

  proc.on('error', () => {
    const fallbackCommand = ['jekyll', ...args].join(' ');
    const fallback = cp.spawn(fallbackCommand, { stdio: 'inherit', shell: true });
    fallback.on('error', () => finish());
    fallback.on('close', () => finish());
  });

  proc.on('close', code => {
    if (code === 0) {
      finish();
    } else {
      const fallbackCommand = ['jekyll', ...args].join(' ');
      const fallback = cp.spawn(fallbackCommand, {
        stdio: 'inherit',
        shell: true,
      });
      fallback.on('error', () => finish());
      fallback.on('close', () => finish());
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
    gulp.series(
      gulp.parallel('sass', 'scripts'),
      'jekyll-dev',
      done => {
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
        gulp.watch(templatePath, gulp.series(['jekyll-rebuild']));
      }
    )
  );
};
