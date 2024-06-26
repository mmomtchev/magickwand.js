import { assert } from 'chai';
import ImageMagick from 'magickwand.js';

it('TS (transpiled to ES6) import test', (done) => {
  ImageMagick.then(({ Magick }) => {
    const im = new Magick.Image;
    assert.instanceOf(im, Magick.Image);
    done();
  }).catch(done);
});
