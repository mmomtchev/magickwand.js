import cp from 'child_process';
import os from 'os';
import chalk from 'chalk';

let native = false;
let wasm = false;

const verbose = process.env.npm_config_loglevel === 'verbose';
const opts = verbose ? { stdio: 'inherit' } : undefined;

const delegates = [
  'fonts',
  'jpeg',
  'png',
  'tiff',
  'webp',
  'jpeg2000',
  'raw',
  'openmedia',
  'brotli',
  'h265',
  'exr',
  'fftw',
  'heif',
  'jbig',
  'cms',
  'xml',
  'gzip',
  'zip',
  'bzip2',
  'zstd',
  'xz',
  'lzma',
  'simd',
  'openmp',
  'display'
];
let conanOpts = [];
for (const d of delegates)
  if (process.env[`npm_config_${d}`])
    conanOpts.push(`-o${d}=${process.env[`npm_config_${d}`].toLowerCase() === 'true' ? 'True' : 'False'}`);

const cmd = os.platform() === 'win32' ? 'npx.cmd' : 'npx';
if (!process.env.npm_config_build_from_source && conanOpts.length === 0) {
  console.log(chalk.cyan(`Trying to install prebuilt native binaries for ${os.platform()}-${os.arch()}...`));
  try {
    cp.execFileSync(cmd, ['node-pre-gyp', 'install'], opts);
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
    if (os.platform() !== 'win32') {
      if (verbose) console.log(conanOpts);
      cp.execFileSync(cmd, ['npm', 'run', 'conan:native'], [...opts, ...conanOpts]);
    } else {
      if (verbose) console.log('Skipping conan on Windows');
    }

    cp.execFileSync(cmd, ['node-pre-gyp', 'install', '--build-from-source'], opts);
    native = true;
  } catch (e) {
    if (verbose) console.log(e);
    console.log(chalk.yellow('Failed...'));
    native = false;
  }
}

console.log(chalk.cyan('Trying to install WASM binaries for emscripten-wasm32...'));
try {
  cp.execFileSync(cmd,
    ['node-pre-gyp', 'install', '--target_platform=emscripten', '--target_arch=wasm32'],
    { env: { ...process.env, npm_config_build_from_source: undefined } }
  );
  wasm = true;
} catch (e) {
  if (verbose) console.log(e);
  console.log(chalk.yellow('Failed...'));
  wasm = false;
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
