import { execFileSync } from 'child_process';
import * as os from 'os';
import * as chai from 'chai';

const assert = chai.assert;

import { MagickLibVersionText, MagickLibAddendum } from 'node-magickwand';

it('ImageMagick version information', () => {
  assert.isString(MagickLibVersionText);
  console.log(`Built with ImageMagick ${MagickLibVersionText}${MagickLibAddendum}`);
});

it('Security Policy', function () {
  this.timeout(10000);
  execFileSync(os.platform() === 'win32' ? 'npx.cmd' : 'npx',
    ['mocha', '--config', '.mocharc.security.json'],
    { cwd: __dirname });
});
