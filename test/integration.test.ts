import * as path from 'path';
import * as fs from 'fs';
import * as process from 'process';
import { execSync } from 'child_process';

describe('integration tests', function() {
  this.timeout(600000);
  const testDir = path.resolve(__dirname, 'integration');
  const list = fs.readdirSync(testDir);

  const install = process.env.MOCHA_MAGICK_INSTALL ?? 'npm link magickwand.js --ignore-scripts';
  const root = process.cwd();

  const browserEnabled = (process.env.MOCHA_INTEGRATION || '').split(',').includes('browser');
  const nodeEnabled = (process.env.MOCHA_INTEGRATION || '').split(',').includes('node');

  const env = { ...process.env, TS_NODE_PROJECT: undefined, CI: undefined };

  for (const test of list) {
    console.log(`trying ${test}`);
    if (!(fs.statSync(path.resolve(testDir, test))).isDirectory())
      continue;

    const karmaPath = path.resolve(testDir, test + '.karma.cjs');
    let browser = false;
    try {
      fs.statSync(karmaPath);
      browser = true;
    } catch { /* empty */ }

    if (browser && !browserEnabled)
      continue;
    if (!browser && !nodeEnabled)
      continue;

    console.log(`scheduling ${test}`);
    it(test + (browser ? ' (browser)' : ' (node)'), async () => {
      console.log(`running ${test}`);
      try {
        process.chdir(path.resolve(testDir, test));
        try {
          console.log(`resetting package-lock.json`);
          fs.rmSync('package-lock.json');
        } catch { /* empty */ }
        try {
          console.log(`clearing node_modules`);
          fs.rmSync('node_modules', { recursive: true });
        } catch { /* empty */ }
        console.log(`installing npm modules`);
        execSync('npm install', { env });
        console.log(`installing magikwand.js "${install}"`);
        execSync(install, { env });
        if (browser) {
          console.log(`building`);
          execSync('npm run build', { stdio: 'pipe', env });
          process.chdir(root);
          execSync(`npx karma start ${karmaPath}`, { env });
        } else {
          console.log(`running npm test`);
          execSync('npm test', { env });
        }
      } catch (e) {
        console.log(`got error ${e}`)
        const execErr = e as Error & { stdout: Buffer, stderr: Buffer; };
        if (execErr.stdout)
          console.error(execErr.stdout.toString());
        if (execErr.stderr)
          console.error(execErr.stderr.toString());
        throw e;
      }
    });
  }
});
