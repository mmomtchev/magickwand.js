const path = require('path');

const binary = require('@mapbox/node-pre-gyp');

const binding_path = binary.find(path.resolve(path.join(__dirname, '../package.json')));
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
