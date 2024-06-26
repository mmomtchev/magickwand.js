// These tests are shared between Node.js and the browser
import type { Magick } from 'magickwand.js';

export default function (
  assert: typeof import('chai').assert,
  bindingsMagick: typeof Magick
) {
  const { Geometry } = bindingsMagick;

  describe('Geometry', () => {
    describe('constructor', () => {
      it('from numbers', () => {
        const gm = new Geometry(100, 80);
        assert.equal(gm.width(), 100);
        assert.equal(gm.height(), 80);
      });

      it('from string', () => {
        const gm = new Geometry('120x100+10+12');
        assert.strictEqual(gm.width(), 120);
        assert.strictEqual(gm.height(), 100);
        assert.strictEqual(gm.xOff(), 10);
        assert.strictEqual(gm.yOff(), 12);
        assert.strictEqual(gm.toString(), '120x100+10+12');
      });

      it('copy constructor', () => {
        const gm1 = new Geometry('120x100');
        const gm2 = new Geometry(gm1);
        gm1.width(100);
        assert.strictEqual(gm1.width(), 100);
        assert.strictEqual(gm2.width(), 120);
      });
    });
  });
}
