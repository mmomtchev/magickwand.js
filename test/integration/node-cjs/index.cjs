const { assert } = require('chai');
const { Magick } = require('node-magickwand');

it('CJS require test', () => {
  const im = new Magick.Image;
  assert.instanceOf(im, Magick.Image);
});
