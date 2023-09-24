import { execFileSync } from 'child_process';
import * as os from 'os';
import * as chai from 'chai';

const assert = chai.assert;

import * as IM from 'node-magickwand';

console.log(`Built with ImageMagick ${IM.MagickLibVersionText}${IM.MagickLibAddendum} (${IM.MagickVersion})`);

it('ImageMagick version information', () => {
  assert.isString(IM.MagickLibVersionText);
  assert.isString(IM.MagickLibAddendum);
  assert.isNumber(IM.MagickLibVersion); // 0x711 for 7.1.1
  assert.isString(IM.MagickVersion);
  assert.strictEqual(IM.MagickQuantumDepth, 'Q16');
  assert.strictEqual(IM.MagickQuantumRange, '65535');
  assert.strictEqual(IM.MagickHDRISupport, '-HDRI');
  assert.strictEqual(IM.NAPI_VERSION, 6);
});

it('Security Policy', function () {
  this.timeout(10000);
  execFileSync(os.platform() === 'win32' ? 'npx.cmd' : 'npx',
    ['mocha', '--config', '.mocharc.security.json'],
    { cwd: __dirname });
});
