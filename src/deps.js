// This resolves the ImageMagick header dependencies
// which are so numerous, it is necessary to automate the process

const fs = require('fs');
const path = require('path');
const child = require('child_process');

const dirs = [
  'preconf',
  'deps/ImageMagick/Magick++/lib',
  'deps/ImageMagick'
];

if (process.argv.length < 5) {
  console.log('Usage: node src/deps.js <cc-source> <regexp pattern> <output> [import|include]');
  process.exit(1);
}

const input = child.spawnSync('g++', [
  ...dirs.map((d) => `-I${d}`),
  '-fsyntax-only',
  process.argv[2],
  '-H'
]);
if (input.status)
  console.log(input.stderr.toString());

const pattern = process.argv[3] ? new RegExp(process.argv[3]) : /./;

let deps = input
  .stderr
  .toString()
  .split('\n')
  .filter((file) => file.match(pattern))
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

let output = '';
const directive = process.argv[5] ?? 'include';
for (let i = 1; i < deps.length; i++) {
  if (deps[i].precedence <= deps[i - 1].precedence) {
    deps.slice(0, i).filter((x) => x.precedence >= deps[i].precedence && !x.processed).sort(sortFn).map((inc) => {
      output += `%${directive} "${inc.include}"\n`;
      inc.processed = true;
    });
  }
}

deps.filter(x => !x.processed).sort(sortFn).map(inc => output += `%${directive} "${inc.include}"\n`);
fs.mkdirSync(path.dirname(process.argv[4]), { recursive: true });
fs.writeFileSync(process.argv[4], output, 'utf-8');
