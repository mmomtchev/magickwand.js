const { assert } = require('chai');

const { CoderInfo, coderInfoList } = require('..').Magick;

describe('CoderInfo', () => {
  it('get', () => {
    const info = new CoderInfo('GIF');

    assert.isTrue(info.isReadable());
    assert.isTrue(info.isWritable());
    assert.isTrue(info.isMultiFrame());
    assert.isTrue(info.canWriteMultithreaded());
    assert.isTrue(info.canWriteMultithreaded());
    assert.strictEqual(info.description(), 'CompuServe graphics interchange format');
    assert.strictEqual(info.mimeType(), 'image/gif');
    assert.strictEqual(info.name(), 'GIF');
  });

  it('list', () => {
    const list = coderInfoList();

    assert.isAtLeast(list.size(), 50);
    for (let i = 0; i < list.size(); i++) {
      assert.isString(list.get(i).name());
    }

    const writables = coderInfoList(CoderInfo.AnyMatch, CoderInfo.TrueMatch, CoderInfo.AnyMatch);
    assert.isBelow(writables.size(), list.size());
  });

  it('iterator', () => {
    const list = coderInfoList();

    assert.isAtLeast(list.size(), 50);
    let i = 0;
    for (const l of list) {
      i++;
      assert.isString(l.name());
    }
    assert.strictEqual(i, list.size());
  });
});