import * as emnapi from '@emnapi/runtime';
import IM_import from '../../lib/binding/emscripten-wasm32/magickwand.js';

const binding = IM_import()
  .then((IM_emnapi) => IM_emnapi.emnapiInit({ context: emnapi.getDefaultContext() }));

export default binding;
