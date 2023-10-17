const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.ts',
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
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
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
