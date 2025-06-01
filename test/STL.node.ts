import * as path from 'path';
import * as fs from 'fs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert: Chai.AssertStatic = chai.assert;

// This test is used only in Node.js
import { Magick, MagickCore } from 'magickwand.js/native';
const { Image, Color } = Magick;

describe('STL', () => {
  it('mosaicImages', () => {
    const src1 = new Image(path.join(__dirname, 'data', 'wizard.gif'));
    const src2 = new Image(src1.size(), new Color('red'));

    const dst = Magick.averageImages([src1, src2]);

    assert.strictEqual(dst.size().width(), src1.size().width());
    const px1 = src1.pixelColor(10, 10);
    const px2 = src2.pixelColor(10, 10);
    const px3 = dst.pixelColor(10, 10);
    assert.closeTo((px1.quantumBlue() + px2.quantumBlue()) / 2, px3.quantumBlue(), 1);
  });

  it('montageImages', () => {
    const src = new Image(path.join(__dirname, 'data', 'wizard.gif'));

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
    const im = new Image(path.join(__dirname, 'data', 'wizard.gif'));

    const blur = new Magick.blurImage(20, 10.5);
    blur.call(im);
    const px1 = im.pixelColor(10, 10);
    assert.closeTo(px1.quantumBlue(), 63616, 1);
  });

  it('(async) blurImage', () => {
    const im = new Image(path.join(__dirname, 'data', 'wizard.gif'));

    const blur = new Magick.blurImage(20, 10.5);
    return assert.isFulfilled(blur.callAsync(im).then(() => {
      const px1 = im.pixelColor(10, 10);
      assert.closeTo(px1.quantumBlue(), 63616, 1);
    }));
  });

  describe('readImages', () => {
    it('readImages()', () => {
      const images = Magick.readImages(path.join(__dirname, 'data', 'wizard.gif'));

      assert.instanceOf(images, Array);
      assert.instanceOf(images[0], Magick.Image);
      assert.equal(images[0].size().width(), 80);
      assert.equal(images[0].size().height(), 106);
    });

    it('readImagesAsync()', () => {
      return assert.isFulfilled(Magick.readImagesAsync(path.join(__dirname, 'data', 'wizard.gif'))
        .then((images) => {
          assert.instanceOf(images, Array);
          assert.instanceOf(images[0], Magick.Image);
          assert.equal(images[0].size().width(), 80);
          assert.equal(images[0].size().height(), 106);
        }));
    });

    it('readImages() w/ReadOptions', () => {
      const opt = new Magick.ReadOptions();
      opt.size(new Magick.Geometry('80x106'));
      assert.strictEqual(opt.size().width(), 80);
      const images = Magick.readImages(path.join(__dirname, 'data', 'wizard.gif'), opt);

      assert.instanceOf(images, Array);
      assert.instanceOf(images[0], Magick.Image);
      assert.equal(images[0].size().width(), 80);
      assert.equal(images[0].size().height(), 106);
    });
  });

  describe('writeImages', () => {
    const tmp = path.join(__dirname, 'data', 'temp.gif');

    it('writeImages()', () => {
      const im = new Magick.Image(new Magick.Geometry(100, 80), new Magick.Color);
      im.magick('GIF');
      Magick.writeImages([im], tmp);
      fs.rmSync(tmp);
    });

    it('writeImagesAsync()', () => {
      const im = new Magick.Image(new Magick.Geometry(100, 80), new Magick.Color);
      im.magick('GIF');
      return assert.isFulfilled(Magick.writeImagesAsync([im], tmp))
        .then(() => fs.promises.rm(tmp));
    });
  });
});
