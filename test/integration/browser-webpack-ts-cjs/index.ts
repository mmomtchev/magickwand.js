import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert as Chai.AssertStatic;

/** 
 * TS transpiled to CJS cannot use the automatic import (it requires ES6).
 * If you transpile to CJS, you will have to manually select the
 * right version - Node.js native or browser WASM.
 * 
 * Also, in the particular case of browser TypeScript transpiled to
 * CJS, you will have to switch your module resolution to node16.
 *
 * Consider migrating to ES6, in 2024 the tools have evolved and most
 * of the problems of the early days have been solved. TS transpiled to
 * ES6 offers numerous advantages for both browser and Node.js code.
 */
import IM from 'magickwand.js/wasm';

describe('Image', () => {
  it('ImageMagick version information', () =>
    IM.then(({ MagickCore, MagickVersion, MagickQuantumDepth, MagickQuantumRange, MagickHDRISupport, NAPI_VERSION }) => {
      assert.isString(MagickVersion);
      assert.strictEqual(MagickQuantumDepth, 'Q16');
      assert.strictEqual(MagickQuantumRange, '65535');
      assert.strictEqual(MagickHDRISupport, '-HDRI');
      assert.strictEqual(NAPI_VERSION, 6);
      assert.isString(MagickCore.GetMagickCopyright());
      assert.isString(MagickCore.GetMagickDelegates());
      assert.isString(MagickCore.GetMagickFeatures());
      assert.isString(MagickCore.GetMagickLicense());
      assert.isString(MagickCore.GetMagickPackageName());
      assert.isString(MagickCore.GetMagickReleaseDate());
    })
  );
});
