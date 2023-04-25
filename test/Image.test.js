const path = require('path');
const fs = require('fs');
const { assert } = require('chai');

const { Image, Geometry, Color } = require('../build/Debug/node-magickwand.node').Magick;

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
