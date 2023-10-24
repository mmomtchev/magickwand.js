const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
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
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        'index.html',
        'spinner.svg'
      ]
    })
  ],
  devServer: {
    port: 8031,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
};
