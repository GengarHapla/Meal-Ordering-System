// Karma configuration
// Generated on Sat Apr 16 2016 08:37:32 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
        // 'node_modules/sinon/pkg/sinon-1.10.0.js',
        'node_modules/chai/chai.js',
        'node_modules/sinon-chai/lib/sinon-chai.js',
        // 'node_modules/sinon/pkg/sinon-1.10.0.js',
        'bower_components/firebase/firebase.js',
        'bower_components/angular/angular.js',
        'app/MealOrderingSystem.module.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-material/angular-material.js',
        'bower_components/angular-material-icons/angular-material-icons.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/hello/dist/hello.all.js',
        'app/MealOrderingSystem.config.js',
        'app/login/loginController.js',
        'app/orders/ordersController.js',
        'app/orders/ordersDialogController.js',
        'app/orders/ordersService.js',
        'spec/*.spec.js'
    ],

    plugins: [
        'karma-mocha',
        'karma-sinon',
        'karma-chai',
        'karma-phantomjs-launcher'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
