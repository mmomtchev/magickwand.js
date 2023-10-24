import cp from 'child_process';
import os from 'os';
import chalk from 'chalk';

let native = false;
let wasm = false;

const cmd = os.platform() === 'win32' ? 'npx.cmd' : 'npx';

if (!process.env.npm_config_build_from_source) {
  console.log(chalk.cyan(`Trying to install prebuilt native binaries for ${os.platform()}-${os.arch()}...`));
  try {
    cp.execFileSync(cmd, ['node-pre-gyp', 'install']);
    native = true;
  } catch (e) {
    console.log(e);
    console.log(chalk.yellow('Failed...'));
    native = false;
  }
}

if (!native || process.env.npm_config_build_from_source) {
  console.log(chalk.cyan(`Trying to rebuild from source for ${os.platform()}-${os.arch()}...`));
  try {
    cp.execFileSync(cmd, ['node-pre-gyp', 'install', '--build-from-source']);
    native = true;
  } catch (e) {
    console.log(chalk.yellow('Failed...'));
    native = false;
  }
}

console.log(chalk.cyan('Trying to install WASM binaries for emscripten-wasm32...'));
try {
  cp.execFileSync(cmd, ['node-pre-gyp', 'install', '--target_platform=emscripten', '-target_arch=wasm32']);
  wasm = true;
} catch (e) {
  console.log(chalk.yellow('Failed...'));
  wasm = false;
}

if (native) {
  console.log(chalk.cyan('Generating Node.js ES6 imports'));
  try {
    cp.execSync('node scripts/gen-es6.js lib/index.mjs');
  } catch (e) {
    console.log(chalk.yellow('Failed...'));
  }
}

if (native)
  console.log(chalk.greenBright('Native module is available'));
else
  console.log(chalk.red('No native module installed'));

if (wasm)
  console.log(chalk.greenBright('WASM browser module is available'));
else
  console.log(chalk.red('No WASM browser module installed'));

if (!wasm && !native)
  process.exit(1);
