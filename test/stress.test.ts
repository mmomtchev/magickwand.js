import * as path from 'path';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import { Magick, MagickCore } from '..';

chai.use(chaiAsPromised);
const assert = chai.assert;

const wizard = path.join(__dirname, 'data', 'wizard.png');

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

describe('stress tests (slow)', () => {
  it('CompositeOp', function(done){
    this.timeout(10000);

    // Produce a reference image
    const imOriginal = new Magick.Image(wizard);
    const imRef = new Magick.Image(wizard);
    imRef.composite(imOriginal, '0x0', MagickCore.OverlayCompositeOp);
    const px = imRef.pixelColor(40, 50);
    assert.strictEqual(px.pixelType(), Magick.Color.RGBAPixel);
    assert.isTrue(px.isValid());
    assert.strictEqual(px.quantumAlpha(), 65535);
    assert.strictEqual(px.quantumBlack(), 0);
    assert.closeTo(px.quantumRed(), 18965, 1);
    assert.closeTo(px.quantumBlue(), 2910, 1);
    assert.closeTo(px.quantumGreen(), 7256, 1);


    // Start 10 read operations in parallel
    const im = [] as Magick.Image[];
    const q = [] as Promise<void>[];
    for (let i = 0; i < 10; i++) {
      im[i] = new Magick.Image;
      process.env.VERBOSE_STRESS && console.time(`read image ${i}`);
      q[i] = im[i].readAsync(wizard)
        .then(() => {
          process.env.VERBOSE_STRESS && console.timeEnd(`read image ${i}`);
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
        .then(() => void (process.env.VERBOSE_STRESS && console.time(`overlayed image ${i} (${im1} & ${im2})`)))
        // Copy the target image using the copy constructor
        .then(() => [new Magick.Image(im[im1]), im[im2]])
        .then(([tgt, other]) => tgt.compositeAsync(other, '0x0', MagickCore.OverlayCompositeOp)
          .then(() => {
            process.env.VERBOSE_STRESS && console.timeEnd(`overlayed image ${i} (${im1} & ${im2})`);
            const px = tgt.pixelColor(40, 50);
            assert.strictEqual(px.pixelType(), Magick.Color.RGBAPixel);
            assert.isTrue(px.isValid());
            assert.strictEqual(px.quantumAlpha(), 65535);
            assert.strictEqual(px.quantumBlack(), 0);
            assert.closeTo(px.quantumRed(), 18965, 1);
            assert.closeTo(px.quantumBlue(), 2910, 1);
            assert.closeTo(px.quantumGreen(), 7256, 1);
            process.env.VERBOSE_STRESS && console.time(`compared ${i} (${im1} & ${im2})`);
            return tgt.compareAsync(imRef);
          })
          .then(r => {
            process.env.VERBOSE_STRESS && console.timeEnd(`compared ${i} (${im1} & ${im2})`);
            assert.isTrue(r);
          }))
      );
    }

    Promise.all(q).then(() => void done());
  });
});
