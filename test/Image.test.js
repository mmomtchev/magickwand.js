const path = require('path');
const fs = require('fs');
const { assert } = require('chai');

const { Image, Geometry, Color } = require('../build/Release/node-magickwand.node').Magick;

describe('Geometry', () => {
  describe('constructor', () => {
    it('from numbers', () => {
      let gm = new Geometry(100, 80);
      assert.equal(gm.width(), 100);
      assert.equal(gm.height(), 80);
    });

    it('from string', () => {
      let gm = new Geometry("120x100");
      assert.equal(gm.width(), 120);
      assert.equal(gm.height(), 100);
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

  it('throw an exception', () => {
    const im = new Image;
    assert.throws(() => {
      im.read('something.png');
    }, /unable to open image/);
  });
});
