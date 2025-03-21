import * as path from 'path';
import * as fs from 'fs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert: Chai.AssertStatic = chai.assert;

// This test is used only in Node.js
import { Magick, MagickCore } from '../native/index.cjs';

it('Security Policy', () => {
  assert.isArray(MagickCore.GetPolicyList());
  assert.isNull(MagickCore.GetPolicyValue('memory'));
  assert.isTrue(MagickCore.IsRightsAuthorized(MagickCore.SystemPolicyDomain, MagickCore.WritePolicyRights, 'file'));

  const websafe = fs.readFileSync(path.resolve(__dirname,
    '..', 'deps', 'ImageMagick', 'config', 'policy-websafe.xml'), 'utf8');
  assert.isTrue(Magick.SetSecurityPolicy(websafe));

  assert.throws(() => {
    const im = new Magick.Image('15x20', 'black');
    im.magick('SVG');
  });

  const list = MagickCore.GetPolicyList();
  assert.isArray(list);
  assert.includeMembers(list, ['memory', 'file', 'disk']);
  assert.isNotNull(MagickCore.GetPolicyValue('memory'));

  MagickCore.ListPolicyInfo();

  assert.isFalse(MagickCore.IsRightsAuthorized(MagickCore.SystemPolicyDomain, MagickCore.WritePolicyRights, 'file'));
});
