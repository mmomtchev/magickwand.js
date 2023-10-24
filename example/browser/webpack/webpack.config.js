const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        path.resolve(__dirname, '..', '..', '..', 'test', 'data', 'wizard.png')
      ]
    })
  ],
  ignoreWarnings: [
    // These have to be fixed in emscripten
    // https://github.com/emscripten-core/emscripten/issues/20503
    {
      module: /magickwand\.worker\.js$/,
      message: /dependency is an expression/,
    },
    {
      message: /Circular dependency/
    },
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
