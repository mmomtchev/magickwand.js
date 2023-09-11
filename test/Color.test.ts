import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const assert = chai.assert;

import { Magick } from 'node-magickwand';
const { Color, ColorCMYK, ColorRGB } = Magick;

describe('Color', () => {
  describe('constructor', () => {
    it('from numbers', () => {
      const cl = new Color(32768, 0, 65535);
      assert.strictEqual(cl.quantumRed(), 32768);
      assert.strictEqual(cl.quantumGreen(), 0);
      assert.strictEqual(cl.quantumBlue(), 65535);
      assert.strictEqual(cl.quantumAlpha(), 65535);
      assert.strictEqual(cl.toString(), '#80000000FFFF');
    });

    it('from string', () => {
      const cl = new Color('#ff7f0160');
      assert.strictEqual(Math.floor(cl.quantumRed() / 256), 0xff);
      assert.strictEqual(Math.floor(cl.quantumGreen() / 256), 0x7f);
      assert.strictEqual(Math.floor(cl.quantumBlue() / 256), 0x01);
      assert.strictEqual(Math.floor(cl.quantumAlpha() / 256), 0x60);

      assert.strictEqual(cl.toString(), '#FFFF7F7F01016060');
    });

    it('from name', () => {
      const cl = new Color('blue');
      assert.strictEqual(cl.quantumRed(), 0);
      assert.strictEqual(cl.quantumGreen(), 0);
      assert.strictEqual(cl.quantumBlue(), 65535);
      assert.strictEqual(cl.quantumAlpha(), 65535);
      assert.strictEqual(cl.toString(), '#00000000FFFF');
    });

    it('CMYK conversion', () => {
      const cl = new Color('#ff7f0160');
      assert.strictEqual(cl.toString(), '#FFFF7F7F01016060');

      const cmyk = new ColorCMYK(cl);
      assert.strictEqual(Math.floor(cmyk.quantumRed() / 256), 0xff);
      assert.strictEqual(Math.floor(cmyk.quantumGreen() / 256), 0x7f);
      assert.strictEqual(Math.floor(cmyk.quantumBlue() / 256), 0x01);
      assert.strictEqual(Math.floor(cmyk.quantumAlpha() / 256), 0x60);

      // Specialized color classes always use [0.0 - 1.0] range
      assert.closeTo(cmyk.cyan(), 1, 1e-3);
      assert.closeTo(cmyk.magenta(), 0.498, 1e-3);
      assert.closeTo(cmyk.yellow(), 0.003, 1e-3);
      assert.closeTo(cmyk.black(), 0, 1e-3);
      assert.strictEqual(cl.toString(), cmyk.toString());
    });

    it('RGB conversion', () => {
      const cl = new Color('#ff7f0160');
      assert.strictEqual(cl.toString(), '#FFFF7F7F01016060');

      const rgb = new ColorRGB(cl);
      assert.strictEqual(Math.floor(rgb.quantumRed() / 256), 0xff);
      assert.strictEqual(Math.floor(rgb.quantumGreen() / 256), 0x7f);
      assert.strictEqual(Math.floor(rgb.quantumBlue() / 256), 0x01);
      assert.strictEqual(Math.floor(rgb.quantumAlpha() / 256), 0x60);

      assert.closeTo(rgb.red(), 1, 1e-3);
      assert.closeTo(rgb.green(), 0.498, 1e-3);
      assert.closeTo(rgb.blue(), 0.003, 1e-3);
      assert.closeTo(rgb.alpha(), 0.376, 1e-3);
      assert.strictEqual(cl.toString(), rgb.toString());

      // Produce HTML color
      assert.strictEqual('#' + [rgb.red(), rgb.green(), rgb.blue(), rgb.alpha()]
        .map((v) => Math.floor(v * 255).toString(16).padStart(2, '0')).join(''),
        '#ff7f0160');
    });
  });
});
