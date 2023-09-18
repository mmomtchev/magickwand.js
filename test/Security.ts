import * as path from 'path';
import * as fs from 'fs';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

import { Magick } from 'node-magickwand';

it('Security Policy', () => {
  const im = new Magick.Image('15x20', 'black');
  im.magick('TIFF');

  const websafe = fs.readFileSync(path.resolve(__dirname,
    '..', 'deps', 'ImageMagick', 'config', 'policy-websafe.xml'), 'utf8');
  assert.isTrue(Magick.SetSecurityPolicy(websafe));

  assert.throws(() => {
    im.magick('SVG');
  });
});
