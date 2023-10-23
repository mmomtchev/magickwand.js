const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  const wasm = new CopyWebpackPlugin({
    patterns: [
      { from: require.resolve('magickwand.js/wasm/main'), to: 'static/js' },
      { from: require.resolve('magickwand.js/wasm/worker'), to: 'static/js' },
      { from: require.resolve('magickwand.js/wasm/wasm'), to: 'static/js' }
    ]
  });

  if (!config.plugins)
    config.plugins = [wasm];
  else
    config.plugins.push(wasm);

  return config;
};
