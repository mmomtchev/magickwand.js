const path = require('path');
const fs = require('fs');
const { assert } = require('chai');

const ImageMagick = require('..');
const { Image, Geometry, Color } = ImageMagick.Magick;
const { MultiplyCompositeOp } = ImageMagick.MagickCore;

describe('Geometry', () => {
  describe('constructor', () => {
    it('from numbers', () => {
      const gm = new Geometry(100, 80);
      assert.equal(gm.width(), 100);
      assert.equal(gm.height(), 80);
    });

    it('from string', () => {
      const gm = new Geometry("120x100");
      assert.equal(gm.width(), 120);
      assert.equal(gm.height(), 100);
    });

    it('copy constructor', () => {
      const gm1 = new Geometry("120x100");
      const gm2 = new Geometry(gm1);
      gm1.width(100);
      assert.strictEqual(gm1.width(), 100);
      assert.strictEqual(gm2.width(), 120);
    });
  });
});

describe('Image', () => {
  describe('constructor', () => {
    it('from path', () => {
      const im = new Image(path.join(__dirname, 'data', 'wizard.png'));
      assert.equal(im.size().width(), 80);
      assert.equal(im.size().height(), 106);
    });

    it('from geometry and color', () => {
      const im = new Image(new Geometry(100, 80), new Color);
      assert.equal(im.size().width(), 100);
      assert.equal(im.size().height(), 80);
    });

    it('copy constructor', () => {
      const im1 = new Image(path.join(__dirname, 'data', 'wizard.png'));
      const im2 = new Image(im1);
      im1.crop(new Geometry(10, 8, 1, 8));
      assert.strictEqual(im1.size().width(), 10);
      assert.strictEqual(im2.size().width(), 80);
    });
  });

  describe('pixelColor', () => {
    it('get', () => {
      const im = new Image(path.join(__dirname, 'data', 'wizard.png'));

      const px = im.pixelColor(10, 10);
      assert.instanceOf(px, Color);
      assert.strictEqual(px.pixelType(), Color.RGBAPixel);
      assert.isTrue(px.isValid());
      assert.strictEqual(px.quantumAlpha(), 65535);
      assert.strictEqual(px.quantumBlack(), 0);
      assert.strictEqual(px.quantumRed(), 65535);
      assert.strictEqual(px.quantumBlue(), 65535);
      assert.strictEqual(px.quantumGreen(), 65535);
    });

    it('set', () => {
      const im = new Image(new Geometry('20x20'), new Color('black'));

      im.pixelColor(10, 10, new Color('red'));

      const px = im.pixelColor(10, 10);
      assert.instanceOf(px, Color);
      assert.strictEqual(px.pixelType(), Color.RGBPixel);
      assert.isTrue(px.isValid());
      assert.strictEqual(px.quantumAlpha(), 65535);
      assert.strictEqual(px.quantumBlack(), 0);
      assert.strictEqual(px.quantumRed(), 65535);
      assert.strictEqual(px.quantumBlue(), 0);
      assert.strictEqual(px.quantumGreen(), 0);
    });
  });

  describe('compositing', () => {
    const im1 = new Image(path.join(__dirname, 'data', 'wizard.png'));
    const im2 = new Image(im1.size(), new Color(0, 65535, 0, 32768));

    im1.composite(im2, new Geometry(0, 0), MultiplyCompositeOp);
    const px = im1.pixelColor(10, 10);
    assert.strictEqual(px.pixelType(), Color.RGBAPixel);
    assert.isTrue(px.isValid());
    assert.strictEqual(px.quantumAlpha(), 65535);
    assert.strictEqual(px.quantumBlack(), 0);
    assert.strictEqual(px.quantumRed(), 32767);
    assert.strictEqual(px.quantumBlue(), 32767);
    assert.strictEqual(px.quantumGreen(), 65535);
  });

  it('read an image, crop it, write it and read it back', () => {
    let im = new Image;
    im.read(path.join(__dirname, 'data', 'wizard.png'));
    assert.equal(im.size().width(), 80);
    im.crop(new Geometry(10, 8, 1, 8));
    assert.equal(im.size().width(), 10);
    im.write('temp.png');

    im = new Image();
    im.read('temp.png');
    assert.equal(im.size().width(), 10);
    fs.rmSync('temp.png');
  });

  it('read an image, write it in different format and read it back', () => {
    let im = new Image;
    im.read(path.join(__dirname, 'data', 'wizard.png'));
    im.magick('JPEG');
    im.write('temp.jpg');

    im = new Image();
    im.read('temp.jpg');
    assert.equal(im.size().width(), 80);
    fs.rmSync('temp.jpg');
  });

  it('throw an exception', () => {
    const im = new Image;
    assert.throws(() => {
      im.read('something.png');
    }, /unable to open image/);
  });
});
