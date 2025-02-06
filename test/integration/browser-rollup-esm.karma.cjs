//
// rollup + ESM
//

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    client: {
      mocha: {
        reporter: 'html',
        timeout: 40000
      }
    },
    files: [
      { pattern: 'browser-rollup-esm/test.js', included: true },
      { pattern: 'browser-rollup-esm/build/index.js', included: true },
      { pattern: 'browser-rollup-esm/build/*', served: true, included: false },
      { pattern: 'browser-rollup-esm/build/assets/*', served: true, included: false }
    ],
    customHeaders: [
      { name: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { name: 'Cross-Origin-Embedder-Policy', value: 'require-corp' }
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};
