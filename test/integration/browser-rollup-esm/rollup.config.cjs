const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonJS = require('@rollup/plugin-commonjs');
const copy = require('rollup-plugin-copy');

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
    copy({
      targets: [
        { src: require.resolve('magickwand.js/wasm/main'), dest: 'build' },
        { src: require.resolve('magickwand.js/wasm/worker'), dest: 'build' },
        { src: require.resolve('magickwand.js/wasm/wasm'), dest: 'build' }
      ]
    })
  ]
};
