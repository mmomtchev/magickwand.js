#!/usr/bin/env node

const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');

const bin = path.resolve(__dirname, '..', 'lib', 'binding', `${os.platform()}-${os.arch()}`, 'bin', 'Magick');
const opts = process.argv.slice(2);
try {
  const r = execFileSync(bin, opts, { encoding: 'ascii' });
  console.log(r);
} catch (e) {
  if (e.stdout) {
    console.error(e.stderr);
    console.error(e.stdout);
  } else {
    console.error(e);
  }
}
