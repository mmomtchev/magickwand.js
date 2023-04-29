const { assert } = require('chai');

const { Magick } = require('..');
const { Image, Geometry, Color } = Magick;

describe('Drawable', () => {
  it('simple drawing', () => {
    const im = new Image(new Geometry(100, 100), new Color('white'));

    im.strokeColor(new Color('red'));
    im.fillColor(new Color('blue'));
    im.strokeWidth(5);

    im.draw(new Magick.DrawableCircle(50, 50, 40, 40));
    const px = im.pixelColor(50, 50);
    assert.strictEqual(px.quantumBlue(), 65535);
  });

  it('mutiple drawables per call', () => {
    const im = new Image(new Geometry(100, 100), new Color('white'));

    im.strokeColor(new Color('red'));
    im.fillColor(new Color('blue'));
    im.strokeWidth(2);

    im.draw([new Magick.DrawableCircle(20, 50, 10, 50), new Magick.DrawableCircle(80, 50, 90, 50)]);
    const px = im.pixelColor(20, 50);
    assert.strictEqual(px.quantumBlue(), 65535);
  });
});
