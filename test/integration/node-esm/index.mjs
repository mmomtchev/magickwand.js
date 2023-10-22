import { assert } from 'chai';
import { Magick } from 'magickwand.js';

it('ES6 import test', () => {
  const im = new Magick.Image;
  assert.instanceOf(im, Magick.Image);
});
