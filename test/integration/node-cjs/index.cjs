const { assert } = require('chai');
const { Magick } = require('magickwand.js/sync');

it('CJS require test', () => {
  const im = new Magick.Image;
  assert.instanceOf(im, Magick.Image);
});
