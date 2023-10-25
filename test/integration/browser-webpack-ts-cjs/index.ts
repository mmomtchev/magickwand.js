import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

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
