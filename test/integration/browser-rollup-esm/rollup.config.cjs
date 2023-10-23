const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonJS = require('@rollup/plugin-commonjs');
const { importMetaAssets } = require('@web/rollup-plugin-import-meta-assets');
const copy = require('rollup-plugin-copy');

module.exports = {
  input: 'index.js',
  output: {
    dir: 'build',
    format: 'iife'
  },
  plugins: [
    nodeResolve({ browser: true }),
    // Needed only for chai
    commonJS(),
    // This is what bundles the WASM
    importMetaAssets(),
    // Alas at the moment @web/rollup-plugin-import-meta-assets
    // is still not capable of automatically bundling the worker dependencies:
    // https://github.com/modernweb-dev/web/issues/2504
    copy({
      targets: [
        { src: require.resolve('magickwand.js/wasm/main'), dest: 'build/assets' }
      ]
    })
  ]
};
