const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonJS = require('@rollup/plugin-commonjs');
const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');
const OMT = require('@surma/rollup-plugin-off-main-thread');

module.exports = {
  input: 'index.js',
  output: {
    dir: 'build',
    format: 'amd'
  },
  plugins: [
    nodeResolve({ browser: true }),
    // Needed only for chai
    commonJS(),
    // These two is what bundles the WASM (the order matters!)
    OMT(),
    importMetaAssets()
  ]
};
