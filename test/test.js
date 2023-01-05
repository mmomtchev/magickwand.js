const { Image, Geometry } = require('../build/Debug/node-magickwand.node');

im = new Image;

try {
  im.read('data/MadeByTheCommunity_White.png');
  im.crop(new Geometry(0, 0, 100, 100));
  im.write('output.png');
} catch (e) {
  console.error(e);
}