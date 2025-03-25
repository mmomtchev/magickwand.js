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

    it(test + (browser ? ' (browser)' : ' (node)'), async () => {
      try {
        process.chdir(path.resolve(testDir, test));
        try {
          fs.rmSync('package-lock.json');
        } catch { /* empty */ }
        try {
          fs.rmSync('node_modules', { recursive: true });
        } catch { /* empty */ }
        try {
          execSync('npm install', { env, stdio: 'pipe' });
          execSync(install, { env });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          console.log('stdout', e.stdout.toString());
          console.error('stderr', e.stderr.toString());
          throw e;
        }
        if (browser) {
          execSync('npm run build', { env, stdio: 'pipe' });
          process.chdir(root);
          execSync(`npx karma start ${karmaPath}`, { env });
        } else {
          execSync('npm test', { env });
          execSync('npx Magick -help', { env });
        }
      } catch (e) {
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
