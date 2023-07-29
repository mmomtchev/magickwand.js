const ghpages = require('gh-pages');
const path = require('path');
const cp = require('child_process');

const branch = cp.execSync('git branch --show-current').toString().trimEnd();
const hash = cp.execSync('git rev-parse HEAD').toString().trimEnd();
const generated = 'generated' + (branch !== 'main' ? `-${branch}` : '');

process.stdout.write(`Publishing to "${generated}" branch... `);
ghpages.publish(path.resolve(__dirname, '../swig'), {
  message: hash,
  branch: generated
}, (err) => {
  if (err) {
    process.stdout.write('error\n');
    console.error(err);
    process.exit(1);
  } else {
    process.stdout.write('success\n');
    process.exit(0);
  }
});
