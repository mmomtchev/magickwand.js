import React from 'react';
import ReactDOM from 'react-dom/client';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import IM from 'magickwand.js/wasm';

chai.use(chaiAsPromised);
const assert = chai.assert;

const root = ReactDOM.createRoot(document.createElement('div'));

function Mocha() {
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
  return <></>;
}

root.render(
  <React.StrictMode>
    <Mocha />
  </React.StrictMode>
);
