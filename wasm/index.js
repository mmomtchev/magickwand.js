import * as emnapi from '@emnapi/runtime';
import IM_import from '../lib/binding/emscripten-wasm32/magickwand.js';

const binding = IM_import()
  .then((IM_emnapi) => {
    const mod = IM_emnapi.emnapiInit({ context: emnapi.getDefaultContext() });
    Object.defineProperty(mod, 'FS', {
      value: IM_emnapi.FS,
      enumerable: true,
      configurable: false,
      writable: false
    });
    return mod;
  });

export default binding;
