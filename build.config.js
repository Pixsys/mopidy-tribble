/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'public',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'client/src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'client/src/**/*.spec.js' ],

    coffee: [ 'client/src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'client/src/**/*.spec.coffee' ],

    atpl: [ 'client/src/app/**/*.tpl.html' ],
    ctpl: [ 'client/src/common/**/*.tpl.html' ],

    html: [ 'client/src/index.html' ],
    less: 'client/src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'client/vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'client/vendor/jquery/jquery.js',
      'client/vendor/jquery-ui/ui/jquery-ui.js',
      // 'client/vendor/jquery-ui/ui/jquery.ui.core.js',
      // 'client/vendor/jquery-ui/ui/jquery.ui.mouse.js',
      // 'client/vendor/jquery-ui/ui/jquery.ui.widget.js',
      // 'client/vendor/jquery-ui/ui/jquery.ui.selectable.js',
      'client/vendor/angular/angular.js',
      'client/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'client/vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'client/vendor/angular-ui-router/release/angular-ui-router.js',
      'client/vendor/angular-ui-utils/modules/route/route.js'
    ],
    css: [
      'client/vendor/jquery-ui/themes/base/jquery-ui.css',
      // 'client/vendor/jquery-ui/themes/base/jquery.ui.selectable.css'
    ],
    assets: [
    ]
  },
};
