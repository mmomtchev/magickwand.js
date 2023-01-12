const path = require('path');
const child = require('child_process');

const dirs = [
  '/usr/include/x86_64-linux-gnu/ImageMagick-6',
  '/usr/include/ImageMagick-6'
];

const output = child.spawnSync('g++', [
  ...dirs.map((d) => `-I${d}`),
  '-o',
  path.join(__dirname, '..', 'build', 'deps-stub'),
  path.join(__dirname, 'deps-stub.cc'),
  '-H'
]);

let deps = output
  .stderr
  .toString()
  .split('\n')
  .filter((file) => file.match(/ImageMagick-6\/(wand|magick)/))
  .map((file) => {
    const parts = file.split(' ');
    return {
      precedence: parts[0].length,
      include: dirs.reduce((a, x) => a.replace(x + '/', ''), parts[1])
    };
  });

const sortFn = (a, b) => b.precedence - a.precedence;

deps = deps
  .filter((file, idx) => idx === deps.findIndex((x) => x.include === file.include));

//deps.map(x => console.log(x));

for (let i = 1; i < deps.length; i++) {
  if (deps[i].precedence <= deps[i - 1].precedence) {
    deps.slice(0, i).filter((x) => x.precedence >= deps[i].precedence && !x.processed).sort(sortFn).map((inc) => {
      console.log(`%include "${inc.include}"`);
      inc.processed = true;
    });
  }
}

deps.filter(x => !x.processed).sort(sortFn).map(inc => console.log(`%include "${inc.include}"`));
