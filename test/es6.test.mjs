import { assert } from 'chai';
import { Magick } from '../lib/index.mjs';

describe('ES6 import', () => {
  it('Image constructor', () => {
    const im = new Magick.Image;
    assert.instanceOf(im, Magick.Image);
  });
});
