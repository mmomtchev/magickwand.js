import cp from 'child_process';
import os from 'os';
import chalk from 'chalk';

let native = false;
let wasm = false;

console.log(chalk.greenBright(`Trying to install prebuilt binaries for ${os.platform()}-${os.arch()}...`));
try {
  cp.execSync('node-pre-gyp install');
  native = true;
} catch (e) {
  console.log(chalk.yellow('Failed...'));
  native = false;
}

if (!native) {
  console.log(chalk.greenBright(`Trying to rebuild from source for ${os.platform()}-${os.arch()}...`));
  try {
    cp.execSync('node-pre-gyp install --build-from-source');
    native = true;
  } catch (e) {
    console.log(chalk.yellow('Failed...'));
    native = false;
  }
}

console.log(chalk.greenBright('Trying to install WASM binaries for emscripten-wasm32...'));
try {
  cp.execSync('node-pre-gyp install --target_platform=emscripten --target_arch=wasm32');
  wasm = true;
} catch (e) {
  console.log(chalk.yellow('Failed...'));
  wasm = false;
}

if (native) {
  console.log(chalk.greenBright('Generating Node.js ES6 importts'));
  try {
    cp.execSync('node scripts/gen-es6.js lib/index.mjs');
  } catch (e) {
    console.log(chalk.yellow('Failed...'));
  }
}

if (native)
  console.log(chalk.bgCyan('Native module is available'));
else
  console.log(chalk.red('No native module installed'));

if (wasm)
  console.log(chalk.bgCyan('WASM browser module is available'));
else
  console.log(chalk.red('No WASM browser module installed'));
