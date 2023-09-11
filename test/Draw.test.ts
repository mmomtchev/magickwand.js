import { assert } from 'chai';

import { Magick, MagickCore } from 'node-magickwand';
const { Image, Coordinate } = Magick;

describe('Drawable', () => {
  it('simple drawing', () => {
    const im = new Image('100x100', 'white');

    im.strokeColor('red');
    im.fillColor('blue');
    im.strokeWidth(5);

    im.draw(new Magick.DrawableCircle(50, 50, 40, 40));
    const px = im.pixelColor(50, 50);
    assert.strictEqual(px.quantumBlue(), 65535);
  });

  it('mutiple drawables per call', () => {
    const im = new Image('100x100', 'white');

    im.strokeColor('red');
    im.fillColor('blue');
    im.strokeWidth(2);

    im.draw([new Magick.DrawableCircle(20, 50, 10, 50), new Magick.DrawableCircle(80, 50, 90, 50)]);
    const px = im.pixelColor(20, 50);
    assert.strictEqual(px.quantumBlue(), 65535);
  });

  it('text', () => {
    const im = new Image('100x100', 'white');

    im.strokeColor('red');
    im.strokeWidth(2);

    im.draw(new Magick.DrawableFont('sans-serif', MagickCore.ItalicStyle, 400, MagickCore.ExpandedStretch));
    im.draw(new Magick.DrawableText(20, 20, 'text'));
    const px = im.pixelColor(21, 21);
    assert.strictEqual(px.quantumRed(), 65535);
  });

  it('SVG-like vector path drawing', () => {
    const im = new Image('100x100', 'white');

    im.strokeColor('red');
    im.fillColor('blue');
    im.strokeWidth(2);

    im.draw(new Magick.DrawablePath([
      new Magick.PathMovetoAbs(new Coordinate(10, 10)),
      new Magick.PathLinetoVerticalRel(80),
      new Magick.PathArcRel(new Magick.PathArcArgs(40, 40, 0, false, false, 50, -50)),
      new Magick.PathClosePath(),
    ]));
    const px = im.pixelColor(10, 12);
    assert.strictEqual(px.quantumRed(), 65535);
  });
});
