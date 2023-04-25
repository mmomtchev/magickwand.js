const path = require('path');
const { assert } = require('chai');

const im = require('../build/Release/node-magickwand.node');
const { Image, Blob } = im.Magick;

describe('Blob', () => {
  let im, rawLength;

  before(() => {
    im = new Image(path.join(__dirname, 'data', 'wizard.png'));
    rawLength = im.size().width() * im.size().height() * 4;
  });

  describe('constructor', () => {
    it('default', () => {
      const blob = new Blob;

      // PNG image
      im.write(blob);
      assert.strictEqual(blob.length(), 10039);

      // RAW image
      im.magick('RGBA');
      im.write(blob);
      assert.strictEqual(blob.length(), rawLength);
    });
  });

  describe('base64', () => {
    it('export to base64', () => {
      const blob = new Blob;
      im.write(blob);

      const b64 = blob.base64();
      assert.closeTo(b64.length, rawLength * 1.33, 500);
    });
  })
});
