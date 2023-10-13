import * as emnapi from '@emnapi/runtime';
import IM_import from '../../lib/binding/wasm-wasm32/node-magickwand';

const binding = IM_import()
  .then((IM_emnapi) => IM_emnapi.emnapiInit({ context: emnapi.getDefaultContext() }));

export default binding;
