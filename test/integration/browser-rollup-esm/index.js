import { assert } from 'chai';

import IM from 'magickwand.js/wasm';

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
  window.testDone();
}).catch(window.testDone);
