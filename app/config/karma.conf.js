/* eslint max-len: ["error", { "ignoreComments": true }]*/

// Karma configuration
// Generated on Tue Jan 31 2017 20:17:25 GMT-0500 (EST)
const testWebpackConfig = require('./webpack.tests.config.js');

const port = process.env.PORT || '9876';

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],


    plugins: [
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-sinon',
      'karma-sinon-chai-latest',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
    ],

    // list of files / patterns to load in the browser
    files: [
      'tests.bundle.js', // karma only needs to know about the test bundle
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests.bundle.js': ['webpack', 'sourcemap'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'mocha'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],
    // browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    webpack: testWebpackConfig,

    webpackServer: {
      noInfo: true, // Suppress all webpack messages, except errors
    },

    client: {
      captureConsole: true,
      mocha: {
        bail: true,
      },
    },
  });
};
