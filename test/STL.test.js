const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const assert = chai.assert;

const { Magick, MagickCore } = require('node-magickwand');
const { Image, Color } = Magick;

describe('STL', () => {
  it('mosaicImages', () => {
    const src1 = new Image(path.join(__dirname, 'data', 'wizard.png'));
    const src2 = new Image(src1.size(), new Color('red'));

    const dst = Magick.averageImages([src1, src2]);

    assert.strictEqual(dst.size().width(), src1.size().width());
    const px1 = src1.pixelColor(10, 10);
    const px2 = src2.pixelColor(10, 10);
    const px3 = dst.pixelColor(10, 10);
    assert.closeTo((px1.quantumBlue() + px2.quantumBlue()) / 2, px3.quantumBlue(), 1);
  });

  it('montageImages', () => {
    const src = new Image(path.join(__dirname, 'data', 'wizard.png'));

    const opts = new Magick.Montage;
    opts.gravity(MagickCore.CenterGravity);
    opts.geometry(new Magick.Geometry('200x200'));
    opts.tile(new Magick.Geometry('3x1'));

    const array = Magick.montageImages([src, src, src], opts);

    assert.lengthOf(array, 1);
    assert.instanceOf(array[0], Image);
    assert.strictEqual(array[0].size().width(), 200 * 3);
  });

  it('blurImage', () => {
    const im = new Image(path.join(__dirname, 'data', 'wizard.png'));

    const blur = new Magick.blurImage(20, 10.5);
    blur.call(im);
    const px1 = im.pixelColor(10, 10);
    assert.closeTo(px1.quantumBlue(), 63635, 1);
  });

  it('(async) blurImage', () => {
    const im = new Image(path.join(__dirname, 'data', 'wizard.png'));

    const blur = new Magick.blurImage(20, 10.5);
    return assert.isFulfilled(blur.callAsync(im).then(() => {
      const px1 = im.pixelColor(10, 10);
      assert.closeTo(px1.quantumBlue(), 63635, 1);
    }));
  });
});
