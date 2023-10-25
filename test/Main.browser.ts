/**
 * Main unit test set for browser WASM
 */

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

import IM from 'magickwand.js/wasm';

import ImageTest from './Image.shared';
import BlobTest from './Blob.shared';
import GeometryTest from './Geometry.shared';
import ColorTest from './Color.shared';
import stressTest from './stress.shared';

describe('Image', () => {
  // This hack allows to block the running of the tests until
  // the WASM binary has finished loading
  before('test', (done) => {
    IM.then(({ Magick, MagickCore, MagickVersion, FS }) => {
      assert.isString(MagickVersion);
      const data = FS.readFile('wizard.gif', { encoding: 'binary' }).buffer;

      ImageTest('wizard.gif', assert, Magick, MagickCore);
      BlobTest('wizard.gif', data, assert, Magick);
      GeometryTest(assert, Magick);
      ColorTest(assert, Magick);
      stressTest('wizard.gif', assert, Magick, MagickCore);
      done();
    });
  });

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
