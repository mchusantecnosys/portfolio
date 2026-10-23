const browserSync = require('browser-sync').create();

browserSync.init(
  {
    server: {
      baseDir: '_site',
    },
    port: 3000,
    open: false,
    notify: false,
    ui: {
      port: 3001,
    },
  },
  () => {
    console.log('Portfolio live at http://localhost:3000');
  }
);
