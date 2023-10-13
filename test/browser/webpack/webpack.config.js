const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
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
