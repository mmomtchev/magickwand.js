//
// React with create-react-app
//
const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, 'browser-react-ts', 'build', 'static', 'js');
const js = fs.readdirSync(dir).find((x) => x.match(/main\.[a-f0-9]+.js/));
if (!js)
  throw new Error('Missing main.js bundle');


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
      { pattern: path.join(__dirname, 'browser-react-ts', 'build', 'static', 'js', js), included: true },
      { pattern: path.join(__dirname, 'browser-react-ts', 'build', '*'), served: true, included: false },
      { pattern: path.join(__dirname, 'browser-react-ts', 'build', 'static', 'js', '*'), served: true, included: false },
      { pattern: path.join(__dirname, 'browser-react-ts', 'build', 'static', 'media', '*'), served: true, included: false }
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
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  });
};
