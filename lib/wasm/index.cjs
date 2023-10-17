const emnapi = require('@emnapi/runtime');
const IM_import = require('../../lib/binding/emscripten-wasm32/node-magickwand');

const binding = IM_import()
  .then((IM_emnapi) => IM_emnapi.emnapiInit({ context: emnapi.getDefaultContext() }));

module.exports = binding;
