// These tests are shared between Node.js and the browser
// (the sync TS types are easier to work with)
import type IM from 'magickwand.js/native';

const verbose = (typeof process !== 'undefined' && process.env.VERBOSE_STRESS !== undefined);

export default function (
  wizard: string,
  assert: typeof import('chai').assert,
  Magick: typeof IM.Magick,
  MagickCore: typeof IM.MagickCore
) {
  /*
   * This test is a typical example of an operation prone to the
   * Node.js/libuv thread starvation problem described in the
   * SWIG Node-API manual
   * 
   * It will launch a very large number of operations
   * - step 1 (reading) is completely not inter-dependent
   * - step 2 (compositing) is slightly inter-dependent
   *     100 operations trying to lock 10 images
   * - step 3 (comparing) is very inter-dependent
   *     all ops try to lock the reference image
   */

  describe('stress tests (slow)', function () {
    this.timeout(10000);
    this.slow(2000);
    const original = new Magick.Image(wizard);

    it('random read w/ OverlayCompositeOp', function (done) {

      // Produce a reference image
      const imRef = new Magick.Image(original);
      imRef.composite(original, '0x0', MagickCore.OverlayCompositeOp);
      const px = imRef.pixelColor(40, 50);
      assert.strictEqual(px.pixelType(), Magick.Color.RGBPixel);
      assert.isTrue(px.isValid());
      assert.strictEqual(px.quantumAlpha(), 65535);
      assert.strictEqual(px.quantumBlack(), 0);
      assert.closeTo(px.quantumRed(), 19359, 1);
      assert.closeTo(px.quantumBlue(), 2195, 1);
      assert.closeTo(px.quantumGreen(), 6097, 1);


      // Start 10 read operations in parallel
      const im = [] as IM.Magick.Image[];
      const q = [] as Promise<void>[];
      for (let i = 0; i < 10; i++) {
        im[i] = new Magick.Image;
        verbose && console.time(`read image ${i}`);
        q[i] = im[i].readAsync(wizard)
          .then(() => {
            verbose && console.timeEnd(`read image ${i}`);
            assert.equal(im[i].size().width(), 80);
            assert.equal(im[i].size().height(), 106);
          });
      }

      
      for (let i = 0; i < 100; i++) {
        // Select two random images
        const im1 = Math.round(Math.random() * 9);
        const im2 = Math.round(Math.random() * 9);

        // Launch a composite op that starts after the two images are read
        q.push(Promise.all([q[im1], q[im2]])
          // Processing times will gradually increase since we launch all
          // of the operations at the same time
          .then(() => void (verbose && console.time(`overlayed image ${i} (${im1} & ${im2})`)))
          // Copy the target image using the copy constructor
          .then(() => [new Magick.Image(im[im1]), im[im2]])
          .then(([tgt, other]) => tgt.compositeAsync(other, '0x0', MagickCore.OverlayCompositeOp)
            .then(() => {
              verbose && console.timeEnd(`overlayed image ${i} (${im1} & ${im2})`);
              const px = tgt.pixelColor(40, 50);
              assert.strictEqual(px.pixelType(), Magick.Color.RGBPixel);
              assert.isTrue(px.isValid());
              assert.strictEqual(px.quantumAlpha(), 65535);
              assert.strictEqual(px.quantumBlack(), 0);
              assert.closeTo(px.quantumRed(), 19359, 1);
              assert.closeTo(px.quantumBlue(), 2195, 1);
              assert.closeTo(px.quantumGreen(), 6097, 1);
              verbose && console.time(`compared ${i} (${im1} & ${im2})`);
              return tgt.compareAsync(imRef);
            })
            .then(r => {
              verbose && console.timeEnd(`compared ${i} (${im1} & ${im2})`);
              assert.isTrue(r);
            }))
        );
      }

      Promise.all(q).then(() => done()).catch(done);
    });


    it('random write w/ OverlayCompositeOp', function (done) {
      // 2 targets
      const targets = [new Magick.Image(original), new Magick.Image(original)];

      // Make 100 copies
      const im = [] as IM.Magick.Image[];
      for (let i = 0; i < 100; i++) {
        im[i] = new Magick.Image(original);
      }

      // Overlay 100 images over the two targets in round-robin mode,
      // launching all operations simultaneously
      // (they will run two by two since they will lock the target image)
      const q = [] as Promise<void>[];
      for (let i = 0; i < 100; i++) {
        verbose && console.time(`overlayed image ${i}`);
        q.push(targets[i % 2].compositeAsync(im[i], '0x0', MagickCore.OverlayCompositeOp)
          .then(() => {
            verbose && console.timeEnd(`overlayed image ${i}`);
            // 10x10 is a white pixel
            const px = targets[i % 2].pixelColor(10, 10);
            assert.strictEqual(px.pixelType(), Magick.Color.RGBPixel);
            assert.isTrue(px.isValid());
            assert.strictEqual(px.quantumAlpha(), 65535);
            assert.strictEqual(px.quantumBlack(), 0);
          }));
      }

      Promise.all(q).then(() => done()).catch(done);
    });


    it('w/ rejections', function (done) {
      // Make 100 empty images
      const im = [] as IM.Magick.Image[];
      for (let i = 0; i < 100; i++) {
        im[i] = new Magick.Image;
      }

      // Half of them broken
      const q = [] as Promise<boolean>[];
      for (let i = 0; i < 100; i++) {
        q.push(im[i].readAsync(i % 2 === 0 ? wizard : 'notwizard.gif')
          .then(() => true)
          .catch(() => false)
        );
      }

      Promise.all(q)
        .then((r) => Promise.all(r.map((result, idx) => {
          if (idx % 2 === 0) {
            assert.isTrue(result);
            return im[idx].compareAsync(original);
          } else {
            assert.isFalse(r[idx]);
            return Promise.resolve(true);
          }
        }
        )))
        .then((r) => {
          r.map((x) => void assert.isTrue(x));
          done();
        })
        .catch(done);
    });
  });
}
