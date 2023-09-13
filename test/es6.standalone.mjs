import { assert } from 'chai';
import IM from 'node-magickwand';
const { Magick } = IM;

describe('ES6 import', () => {
  it('Image constructor', () => {
    const im = new Magick.Image;
    assert.instanceOf(im, Magick.Image);
  });
});
