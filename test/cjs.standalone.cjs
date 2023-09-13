const { assert } = require('chai');
const { Magick } = require('node-magickwand');

describe('CJS require', () => {
  it('Image constructor', () => {
    const im = new Magick.Image;
    assert.instanceOf(im, Magick.Image);
  });
});
