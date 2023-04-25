const path = require('path');
const fs = require('fs');
const { assert } = require('chai');

const { CoderInfo } = require('..').Magick;

describe('CoderInfo', () => {
  it('get info', () => {
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
});
