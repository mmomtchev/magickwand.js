module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
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
