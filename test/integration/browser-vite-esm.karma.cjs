//
// webpack + ESM
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
      { pattern: 'browser-vite-esm/dist/assets/*.js', included: true, type: 'module' },
      { pattern: 'browser-vite-esm/dist/assets/*', served: true, included: false }
    ],
    proxies: {
      '/assets/': '/base/browser-vite-esm/dist/assets/',
    },
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
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  });
};
