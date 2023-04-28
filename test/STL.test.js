const path = require('path');
const { assert } = require('chai');

const Magick = require('..').Magick;
const { Image, Color } = Magick;

describe('STL', () => {
  it('mosaicImages', () => {
    const src1 = new Image(path.join(__dirname, 'data', 'wizard.png'));
    const src2 = new Image(src1.size(), new Color('red'));

    const dst = new Image();
    Magick.averageImages(dst, [src1, src2]);

    assert.strictEqual(dst.size().width(), src1.size().width());
    const px1 = src1.pixelColor(10, 10);
    const px2 = src2.pixelColor(10, 10);
    const px3 = dst.pixelColor(10, 10);
    assert.closeTo((px1.quantumBlue() + px2.quantumBlue()) / 2, px3.quantumBlue(), 1);
  });

  it('montageImages', () => {
    const src = new Image(path.join(__dirname, 'data', 'wizard.png'));

    const array = Magick.montageImages([src, src, src], new Magick.Montage);
    assert.isAbove(array.length, 0);
    for (const im of array) {
      assert.instanceOf(im, Image);
    }
  });
});
