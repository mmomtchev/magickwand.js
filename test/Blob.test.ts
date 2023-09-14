import * as path from 'path';
import * as fs from 'fs';
import { assert } from 'chai';

import { Magick } from 'node-magickwand';
const { Image, Blob } = Magick;

describe('Blob', () => {
  let im: Magick.Image, rawLength: number;

  before(() => {
    im = new Image(path.join(__dirname, 'data', 'wizard.png'));
    rawLength = im.size().width() * im.size().height() * 4;
  });

  describe('constructor', () => {
    it('default', () => {
      const blob = new Blob;

      // PNG image
      im.magick('PNG');
      im.write(blob);
      assert.isBelow(blob.length(), rawLength);
      assert.isAbove(blob.length(), 1024);

      // RAW image
      im.magick('RGBA');
      im.write(blob);
      assert.strictEqual(blob.length(), rawLength);
    });

    it('from Buffer', () => {
      const data = fs.readFileSync(path.join(__dirname, 'data', 'wizard.png'));
      const blob = new Blob(data);
      const image = new Image;
      image.read(blob);
      assert.strictEqual(image.size().width(), im.size().width());
    });

    it('copy constructor', () => {
      const blob1 = new Blob;
      im.magick('JPG');
      im.write(blob1);

      const blob2 = new Blob(blob1);
      im.magick('PNG');
      im.write(blob2);

      const test = new Image;
      test.read(blob1);
      assert.strictEqual(test.magick(), 'JPEG');
      test.read(blob2);
      assert.strictEqual(test.magick(), 'PNG');
    });
  });

  describe('buffer', () => {
    it('retrieve data in Buffer', () => {
      const blob = new Blob;
      im.magick('RGBA');
      im.write(blob);
      const buffer = blob.data();
      assert.instanceOf(buffer, Buffer);
      assert.lengthOf(buffer, rawLength);
    });
  });

  describe('base64', () => {
    it('export to base64', () => {
      const blob = new Blob;
      im.magick('RGBA');
      im.write(blob);

      const b64 = blob.base64();
      assert.typeOf(b64, 'string');
      assert.closeTo(b64.length, rawLength * 1.33, 500);
    });

    it('(async) export to base64', () => {
      const blob = new Blob;
      return assert.isFulfilled(
        im.magickAsync('RGBA')
          .then(() => im.writeAsync(blob))
          .then(() => blob.base64Async())
          .then((b64) => {
            assert.typeOf(b64, 'string');
            assert.closeTo(b64.length, rawLength * 1.33, 500);
          }));
    });

    it('import RGBA from base64', () => {
      const blobIn = new Blob;
      im.magick('RGBA');
      im.write(blobIn);
      const b64 = blobIn.base64();
      assert.typeOf(b64, 'string');

      const blobOut = new Blob;
      blobOut.base64(b64);
      const imOut = new Image(blobOut, im.size(), 4, 'RGBA');
      assert.strictEqual(imOut.size().width(), im.size().width());
    });

    it('(async) import RGBA from base64', () => {
      const blobIn = new Blob;
      return assert.isFulfilled(
        im.magickAsync('RGBA')
          .then(() => im.writeAsync(blobIn))
          .then(() => blobIn.base64Async())
          .then((b64) => {
            const blobOut = new Blob;
            return blobOut.base64Async(b64)
              .then(() => {
                const imOut = new Image(blobOut, im.size(), 4, 'RGBA');
                assert.strictEqual(imOut.size().width(), im.size().width());
              });
          }));
    });

    it('import PNG from base64', () => {
      const blobIn = new Blob;
      im.magick('PNG');
      im.write(blobIn);
      const b64 = blobIn.base64();
      assert.typeOf(b64, 'string');

      const blobOut = new Blob;
      blobOut.base64(b64);
      const imOut = new Image(blobOut);
      assert.strictEqual(imOut.size().width(), im.size().width());
    });
  });
});
