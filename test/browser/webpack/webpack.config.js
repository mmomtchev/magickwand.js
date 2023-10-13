const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  // The produced JS loader for the WASM file is dual-purpose Node.js/browser
  // This means that it auto-detects its environment and includes some Node.js
  // libraries when it detects that is running in Node.js.
  // However webpack cannot know this and it will try to bundle these
  // This tells him to leave these alone as dangling requires - because
  // we know that these won't be used in the browser.
  // It remains to be seen if there is any way around it except
  // generating two separate JS loaders.
  externals: [
    'fs',
    'crypto',
    'path',
    'child_process',
    'ws'
  ],
  // In a very near future this will be automatic, the end user
  // does not have to know about it.
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        path.resolve(__dirname, '..', '..', '..', 'lib/binding/wasm-wasm32/node-magickwand.wasm')
      ]
    })
  ],
  devServer: {
    port: 8030,
    static: {
      directory: __dirname,
    },
    // Shared-memory multithreading will require this
    // (when it starts working)
    headers: process.env.COOP
      ? {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      }
      : undefined
  }
};
