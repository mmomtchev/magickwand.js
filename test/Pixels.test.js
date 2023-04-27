const path = require('path');
const fs = require('fs');
const { assert } = require('chai');

const { Image, Pixels } = require('..').Magick;

describe('Pixels', () => {
  let im, rawLength;

  before(() => {
    im = new Image(path.join(__dirname, 'data', 'wizard.png'));
    rawLength = im.size().width() * im.size().height() * 4;
  });

  it('constructor', () => {
    const pixels = new Pixels(im);

    assert.instanceOf(pixels, Pixels);
    pixels.get(10, 10, 5, 5);
  });
});