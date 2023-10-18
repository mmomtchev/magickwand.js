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
        path.resolve(__dirname, '..', '..', '..', 'lib/binding/emscripten-wasm32/node-magickwand.wasm'),
        path.resolve(__dirname, '..', '..', '..', 'lib/binding/emscripten-wasm32/node-magickwand.js'),
        path.resolve(__dirname, '..', '..', '..', 'lib/binding/emscripten-wasm32/node-magickwand.worker.js')
      ]
    })
  ],
  devServer: {
    port: 8030,
    static: {
      directory: __dirname,
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
};
