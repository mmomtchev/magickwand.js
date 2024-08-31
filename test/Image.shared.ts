// These tests are shared between Node.js and the browser
import type { Magick, MagickCore } from 'magickwand.js';

export default function (
  path: string,
  assert: typeof import('chai').assert,
  bindingsMagick: typeof Magick,
  bindingsMagickCore: typeof MagickCore
) {
  const { Image, Geometry, Color, Blob } = bindingsMagick;
  const { MultiplyCompositeOp, AffineDistortion } = bindingsMagickCore;

  describe('Image', () => {
    describe('constructor', () => {
      it('from path', () => {
        const im = new Image(path);
        assert.equal(im.size().width(), 80);
        assert.equal(im.size().height(), 106);
      });

      it('from geometry and color', () => {
        const im = new Image('100x80', 'red');
        assert.equal(im.size().width(), 100);
        assert.equal(im.size().height(), 80);
      });

      it('from TypedArray', () => {
        const array = new Float32Array(100 * 120 * 3);
        array.fill(1);
        const im = new Image(100, 120, 'RGB', array);
        assert.equal(im.size().width(), 100);
        assert.equal(im.size().height(), 120);
        assert.equal(im.pixelColor(10, 10).quantumBlue(), 65535);
      });

      it('copy constructor', () => {
        const im1 = new Image(path);
        const im2 = new Image(im1);
        im1.crop('10x8+1+8');
        assert.strictEqual(im1.size().width(), 10);
        assert.strictEqual(im2.size().width(), 80);
      });

      it('rejects null', () => {
        // @ts-ignore
        assert.throws(() => new Image(null), /Illegal arguments for construction/);
      });

      it('handling invalid color', () => {
        assert.throws(() => {
          new Image('100x100', 'invalid');
        }, /unrecognized color `invalid'/);
      });
    });

    describe('pixelColor', () => {
      it('get', () => {
        const im = new Image(path);

        const px = im.pixelColor(10, 10);
        assert.instanceOf(px, Color);
        assert.strictEqual(px.pixelType(), Color.RGBPixel);
        assert.isTrue(px.isValid());
        assert.strictEqual(px.quantumAlpha(), 65535);
        assert.strictEqual(px.quantumBlack(), 0);
        assert.strictEqual(px.quantumRed(), 65535);
        assert.strictEqual(px.quantumBlue(), 65535);
        assert.strictEqual(px.quantumGreen(), 65535);
      });

      it('set', () => {
        const im = new Image('20x20', 'black');

        im.pixelColor(10, 10, 'red');

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

    for (const typed of [Uint8Array, Uint16Array, Uint32Array, BigUint64Array, Float32Array, Float64Array]) {
      describe('TypedArray ' + typed.name, () => {
        it('read', () => {
          const im = new Image();
          // Test with a subarray offset 1024 from the underlying ArrayBuffer
          // to ensure offsets are handled correctly
          const pixels = new typed(15 * 20 * 4 + 1024);

          if (pixels instanceof BigUint64Array)
            pixels.subarray(1024).fill(2n ** (8n * BigInt(typed.BYTES_PER_ELEMENT)) - 1n);
          else if (pixels instanceof Float32Array || pixels instanceof Float64Array)
            pixels.subarray(1024).fill(1);
          else
            pixels.subarray(1024).fill(2 ** (8 * typed.BYTES_PER_ELEMENT) - 1);

          im.read(15, 20, 'RGBA', pixels.subarray(1024));

          const px = im.pixelColor(5, 5);
          assert.strictEqual(px.pixelType(), Color.RGBAPixel);
          assert.isTrue(px.isValid());
          assert.strictEqual(px.quantumAlpha(), 65535);
          assert.strictEqual(px.quantumBlack(), 0);
          assert.strictEqual(px.quantumRed(), 65535);
          assert.strictEqual(px.quantumBlue(), 65535);
          assert.strictEqual(px.quantumGreen(), 65535);

          assert.throws(() => {
            im.read(20, 20, 'RGBA', pixels.subarray(1024));
          }, /does not match the number of pixels/);
        });

        it('readAsync', () => {
          const im = new Image();
          const pixels = new typed(15 * 20 * 4);

          if (pixels instanceof BigUint64Array)
            pixels.fill(2n ** (8n * BigInt(typed.BYTES_PER_ELEMENT)) - 1n);
          else if (pixels instanceof Float32Array || pixels instanceof Float64Array)
            pixels.fill(1);
          else
            pixels.fill(2 ** (8 * typed.BYTES_PER_ELEMENT) - 1);

          return assert.isFulfilled(
            im.readAsync(15, 20, 'RGBA', pixels)
              .then(() => {
                const px = im.pixelColor(5, 5);
                assert.strictEqual(px.pixelType(), Color.RGBAPixel);
                assert.isTrue(px.isValid());
                assert.strictEqual(px.quantumAlpha(), 65535);
                assert.strictEqual(px.quantumBlack(), 0);
                assert.strictEqual(px.quantumRed(), 65535);
                assert.strictEqual(px.quantumBlue(), 65535);
                assert.strictEqual(px.quantumGreen(), 65535);

                assert.isRejected(im.readAsync(20, 20, 'RGBA', pixels),
                  /does not match the number of pixels/);
              }));
        });

        it('write', function () {
          const im = new Image('15x20', new Color(0, 65535, 0, 0));
          const pixels = new typed(15 * 20 * 4);

          im.write(0, 0, 15, 20, 'RGBA', pixels);

          if (typed.name.startsWith('Float'))
            assert.strictEqual(pixels[1], 1);
          else if (typed.BYTES_PER_ELEMENT < 8)
            assert.strictEqual(pixels[1], 2 ** (8 * typed.BYTES_PER_ELEMENT) - 1);
          else
            assert.strictEqual(pixels[1], 2n ** (8n * BigInt(typed.BYTES_PER_ELEMENT)) - 1n);

          assert.throws(() => {
            im.write(0, 0, 5, 5, 'RGB', pixels);
          }, /does not match the number of pixels/);
        });

        it('writeAsync', function () {
          const im = new Image('15x20', new Color(0, 65535, 0, 0));
          const pixels = new typed(15 * 20 * 4);

          return assert.isFulfilled(
            im.writeAsync(0, 0, 15, 20, 'RGBA', pixels)
              .then(() => {
                if (typed.name.startsWith('Float'))
                  assert.strictEqual(pixels[1], 1);
                else if (typed.BYTES_PER_ELEMENT < 8)
                  assert.strictEqual(pixels[1], 2 ** (8 * typed.BYTES_PER_ELEMENT) - 1);
                else
                  assert.strictEqual(pixels[1], 2n ** (8n * BigInt(typed.BYTES_PER_ELEMENT)) - 1n);

                return assert.isRejected(im.writeAsync(0, 0, 5, 5, 'RGB', pixels),
                  /does not match the number of pixels/);
              })
          );
        });
      });
    }

    it('composite', () => {
      const im1 = new Image(path);
      const im2 = new Image(im1.size(), new Color(0, 65535, 0, 32768));

      im1.composite(im2, new Geometry(0, 0), MultiplyCompositeOp);
      const px = im1.pixelColor(10, 10);
      assert.strictEqual(px.pixelType(), Color.RGBPixel);
      assert.isTrue(px.isValid());
      assert.strictEqual(px.quantumAlpha(), 65535);
      assert.strictEqual(px.quantumBlack(), 0);
      assert.strictEqual(px.quantumRed(), 32767);
      assert.strictEqual(px.quantumBlue(), 32767);
      assert.strictEqual(px.quantumGreen(), 65535);
    });

    it('compositeAsync', () => {
      const im1 = new Image(path);
      const im2 = new Image(im1.size(), new Color(0, 65535, 0, 32768));

      return assert.isFulfilled(
        im1.compositeAsync(im2, new Geometry(0, 0), MultiplyCompositeOp)
          .then(() => {
            const px = im1.pixelColor(10, 10);
            assert.isTrue(px.isValid());
            assert.strictEqual(px.pixelType(), Color.RGBPixel);
            assert.strictEqual(px.quantumAlpha(), 65535);
            assert.strictEqual(px.quantumBlack(), 0);
            assert.strictEqual(px.quantumRed(), 32767);
            assert.strictEqual(px.quantumBlue(), 32767);
            assert.strictEqual(px.quantumGreen(), 65535);
          })
      );
    });

    it('read an image, crop it, write it and read it back', () => {
      const tmpBlob = new Blob;
      let im = new Image;

      im.read(path);
      assert.equal(im.size().width(), 80);
      im.crop('10x8+1+8');
      assert.equal(im.size().width(), 10);
      im.write(tmpBlob);

      im = new Image();
      im.read(tmpBlob);
      assert.equal(im.size().width(), 10);
    });

    it('distort', () => {
      let im = new Image;

      im.read(path);
      assert.equal(im.size().width(), 80);
      im.distort(AffineDistortion, [
        3.5, 60.5, 3.5, 60.5,
        32.5, 60.5, 32.5, 60.5,
        3.5, 30.5, 33.5, 20.5
      ], false);
      assert.equal(im.size().width(), 80);
    });

    it('(async) read an image, crop it, write it and read it back', () => {
      const tmpBlob = new Blob;
      let im = new Image;

      return assert.isFulfilled(im.readAsync(path)
        .then(() => im.sizeAsync())
        .then((size) => {
          assert.equal(size.width(), 80);
          return im.cropAsync('10x8+1+8');
        })
        .then(() => im.sizeAsync())
        .then((size) => {
          assert.equal(size.width(), 10);
          return im.writeAsync(tmpBlob);
        })
        .then(() => {
          im = new Image();
          return im.readAsync(tmpBlob);
        })
        .then(() => im.sizeAsync())
        .then((size) => {
          assert.equal(size.width(), 10);
        }));
    });

    it('read an image, write it in different format and read it back', () => {
      const tmpBlob = new Blob;
      let im = new Image;

      im.read(path);
      im.magick('GIF');
      im.write(tmpBlob);

      im = new Image();
      im.read(tmpBlob);
      assert.equal(im.size().width(), 80);
    });

    it('(async) read an image, write it in different format and read it back', () => {
      const tmpBlob = new Blob;
      let im = new Image;

      return assert.isFulfilled(im.readAsync(path)
        .then(() => im.magickAsync('GIF'))
        .then(() => im.writeAsync(tmpBlob))
        .then(() => {
          im = new Image();
          return im.readAsync(tmpBlob);
        })
        .then(() => {
          assert.equal(im.size().width(), 80);
        }));
    });

    it('throw an exception', () => {
      const im = new Image;
      assert.throws(() => {
        im.read('something.gif');
      }, /unable to open image/);
    });

    it('(async) throw an exception', () => {
      const im = new Image;
      return assert.isRejected(im.readAsync('something.gif'), /unable to open image/);
    });
  });
}
