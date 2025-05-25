const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');

module.exports = {
  input: 'index.js',
  output: {
    dir: 'build',
    format: 'umd'
  },
  plugins: [
    nodeResolve({ browser: true }),
    // This is what bundles the WASM
    importMetaAssets()
  ]
};
