const ghpages = require('gh-pages');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const generated_path = path.resolve(__dirname, '..', 'swig');
const source_path = path.resolve(__dirname, '..', 'src');

const hash = crypto.createHash('md5');
for (const file of fs.readdirSync(source_path, 'utf8').sort()) {
  hash.update(fs.readFileSync(path.resolve(source_path, file), 'utf8'));
}
const message = hash.digest('hex');

process.stdout.write(`Publishing ${message} to generated branch... `);
ghpages.publish(generated_path, {
  message,
  branch: 'generated'
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
