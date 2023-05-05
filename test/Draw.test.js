const { assert } = require('chai');

const { Magick, MagickCore } = require('node-magickwand');
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

  it('text', () => {
    const im = new Image(new Geometry(100, 100), new Color('white'));

    im.strokeColor(new Color('red'));
    im.strokeWidth(2);

    im.draw(new Magick.DrawableFont('sans-serif', MagickCore.ItalicStyle, 400, MagickCore.ExpandedStretch));
    im.draw(new Magick.DrawableText(20, 20, 'text'));
    const px = im.pixelColor(21, 21);
    assert.strictEqual(px.quantumRed(), 65535);
  });
});
