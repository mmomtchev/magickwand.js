const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        require.resolve('node-magickwand/wasm/main'),
        require.resolve('node-magickwand/wasm/worker'),
        require.resolve('node-magickwand/wasm/wasm')
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
