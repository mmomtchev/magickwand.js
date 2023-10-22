import { assert } from 'chai';
import { Magick } from 'magickwand.js';

it('TS import test', () => {
  const im = new Magick.Image;
  assert.instanceOf(im, Magick.Image);
});
