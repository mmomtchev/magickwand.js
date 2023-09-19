import { execFileSync } from 'child_process';
import * as chai from 'chai';

const assert = chai.assert;

import { MagickLibVersionText } from 'node-magickwand';

it('ImageMagick version information', () => {
  assert.isString(MagickLibVersionText);
  console.log('Built with ImageMagick', MagickLibVersionText);
});

it('Security Policy', function() {
  this.timeout(10000);
  execFileSync('npx',
    ['mocha', '--config', '.mocharc.security.json'],
    { cwd: __dirname, shell: true });
});
