import { execFileSync } from 'child_process';
import * as os from 'os';
import * as chai from 'chai';

const assert = chai.assert;

import * as IM from 'magickwand.js';
import { MagickCore } from 'magickwand.js';

describe('Core', () => {
  const features = MagickCore.GetMagickFeatures().trimEnd().split(' ').join(',');
  console.log(`Built with ImageMagick ${IM.MagickLibVersionText}${IM.MagickLibAddendum}` +
    ` from ${MagickCore.GetMagickReleaseDate()} [${features}] (${IM.MagickVersion}) `);
  console.log(`Includes ${MagickCore.GetMagickDelegates().split(' ').join(',')}`);

  it('ImageMagick version information', () => {
    assert.isString(IM.MagickLibVersionText);
    assert.isString(IM.MagickLibAddendum);
    assert.isNumber(IM.MagickLibVersion); // 0x711 for 7.1.1
    assert.isString(IM.MagickVersion);
    assert.strictEqual(IM.MagickQuantumDepth, 'Q16');
    assert.strictEqual(IM.MagickQuantumRange, '65535');
    assert.strictEqual(IM.MagickHDRISupport, '-HDRI');
    assert.strictEqual(IM.NAPI_VERSION, 6);
    assert.isString(MagickCore.GetMagickCopyright());
    assert.isString(MagickCore.GetMagickDelegates());
    assert.isString(MagickCore.GetMagickFeatures());
    assert.isString(MagickCore.GetMagickLicense());
    assert.isString(MagickCore.GetMagickPackageName());
    assert.isString(MagickCore.GetMagickReleaseDate());
  });

  it('Security Policy', function () {
    this.timeout(10000);
    execFileSync(os.platform() === 'win32' ? 'npx.cmd' : 'npx',
      ['mocha', '--config', '.mocharc.security.json'],
      { cwd: __dirname, shell: true });
  });

});
