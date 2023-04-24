const path = require('path');
const fs = require('fs');
const { assert } = require('chai');

const { Image, Pixels } = require('../build/Release/node-magickwand.node');

describe('Pixels', () => {
  describe('constructor', () => {
    it('from Image', () => {
      const im = new Image(path.join(__dirname, 'data', 'wizard.png'));
      const pixels = new Pixels(im);
      const pp = pixels.get(10, 10, 10, 10);
    });
  });
});

