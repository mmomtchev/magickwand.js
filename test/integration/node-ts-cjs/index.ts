import { assert } from 'chai';
/** 
 * TS transpiled to CJS cannot use the automatic import (it requires ES6).
 * If you transpile to CJS, you will have to manually select the
 * right version - Node.js native or browser WASM.
 * 
 * Consider migrating to ES6, in 2024 the tools have evolved and most
 * of the problems of the early days have been solved. TS transpiled to
 * ES6 offers numerous advantages for both browser and Node.js code.
 */
import { Magick } from 'magickwand.js/native';

it('TS (transpiled to CJS) import test', () => {
  const im = new Magick.Image;
  assert.instanceOf(im, Magick.Image);
});
