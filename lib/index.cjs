const path = require('path');
const os = require('os');
const binary = require('@mapbox/node-pre-gyp');


const binding_path = binary.find(path.resolve(path.join(__dirname, '../package.json')));
// Workaround for https://github.com/conan-io/conan-center-index/issues/10740
switch (os.platform()) {
  case 'linux':
    // On Linux, this is (almost) always there - or otherwise you don't have fonts anyway
    process.env['FONTCONFIG_FILE'] = '/etc/fonts/fonts.conf';
    process.env['FONTCONFIG_PATH'] = '/etc/fonts';
    break;
  case 'darwin':
    // On macOS, this requires fontconfig from Homebrew - or otherwise font aliases wont work
    process.env['FONTCONFIG_FILE'] = '/usr/local/etc/fonts/fonts.conf';
    process.env['FONTCONFIG_PATH'] = '/usr/local/etc/fonts';
    break;
}
process.env['MAGICK_HOME'] = path.join(path.dirname(binding_path), 'ImageMagick');
const dll = require(binding_path);

// Proper implementation of the iterator protocol is very hard in C++
// This is something that is best done in JS

// List of the iterable classes
const iterables = [
  dll.std.coderInfoArray
];

// A generic iterator
const iterator = function () {
  if (!this) throw new Error('Invalid invocation');

  let idx = 0;
  const size = this.size();
  const iterable = this;

  const next = () => {
    if (idx < size) {
      return {
        done: false,
        value: iterable.get(idx++),
        next
      };
    }

    return {
      done: true,
      value: null,
      next
    };
  };

  return {
    next
  };
};

// Install the iterators
for (const i of iterables) {
  i.prototype[Symbol.iterator] = iterator;
}

module.exports = dll;
