import * as fs from 'fs';
import * as process from 'process';
import { execSync } from 'child_process';

it('browser tests', function () {
  if (!(process.env.MOCHA_INTEGRATION || '').split(',').includes('browser'))
    this.skip();
  this.timeout(600000);
  const pwd = process.cwd();
  process.chdir(__dirname);
  try {
    fs.rmSync('build');
  } catch { /* empty */ }
  try {
    execSync('npx webpack --mode=production', { stdio: 'inherit' });
    execSync('npx karma start', { stdio: 'inherit' });
  } finally {
    process.chdir(pwd);
  }
});
