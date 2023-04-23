const path = require('path');
const fs = require('fs');
const { assert } = require('chai');

const { Image, Geometry } = require('../build/Release/node-magickwand.node');

describe('Geometry', () => {
  it('constructor', () => {
    let gm = new Geometry(100, 80);
    assert.equal(gm.width(), 100);
    assert.equal(gm.height(), 80);
  });
});

describe('Image', () => {
  it('read an image, crop it, write it and read it back', () => {
    let im = new Image;
    im.read(path.join(__dirname, 'data', 'MadeByTheCommunity_White.png'));
    assert.equal(im.size().width(), 200);
    im.crop(new Geometry(100, 80, 10, 8));
    assert.equal(im.size().width(), 100);
    im.write('temp.png');

    im = new Image();
    im.read('temp.png');
    assert.equal(im.size().width(), 100);    
    fs.rmSync('temp.png');
  });

  it('throw an exception', () => {
    const im = new Image;
    assert.throws(() => {
      im.read('something.png');
    }, /unable to open image/);
  });
});
