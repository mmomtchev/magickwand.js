/**
 * This custom install script is launched by npm install - it replaces
 * the default one that is usually provided by node-gyp and node-pre-gyp.
 * 
 * It parses the npm install options from the environment (npm_config_ variables).
 * 
 * It performs a number of tasks unique to SWIG-generated dual-build projects:
 * 
 * - It downloads the pregenerated SWIG wrappers so that the user is not required to have SWIG
 *   in order to install from source
 * 
 * - It uses conan to build all the dependencies on Linux, macOS and WASM
 *   (in the particular case of ImageMagick, Windows is self-contained)
 * 
 * - It uses node-pre-gyp to eventually download pre-built binaries for the native platform
 *   and WASM which is always available and rarely requires to be rebuilt
 * 
 * - It can manage custom build configuration with a reduced number of dependencies
 * 
 * - It can use node-pre-gyp to build the native version if there are not
 *   prebuilt binaries or if the user wants to rebuild from source
 * 
 * 
 * Alas, cross-platform compilation (for WASM) and conan integration make evident
 * the design short-comings of gyp, which is hopelessly outdated and not maintained
 * anymore.
 * 
 * This solution aims to be "good-enough" until a viable long-term replacement,
 * based on CMake, becomes available.
 */

import cp from 'child_process';
import os from 'os';
import chalk from 'chalk';

let native = false;
let wasm = false;

const verbose = process.env.npm_config_loglevel === 'verbose';
const opts = {
  stdio: verbose ? 'inherit' : undefined,
  shell: true
};

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
  'color',
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

// Parse the conditional compilation options from the npm install commandline
// that npm has made available through the environment
let conanOpts = [];
for (const d of delegates)
  if (process.env[`npm_config_${d}`])
    conanOpts.push(`-o${d}=${process.env[`npm_config_${d}`].toLowerCase() === 'true' ? 'True' : 'False'}`);

// Cross-platform way of calling these
const npx = os.platform() === 'win32' ? 'npx.cmd' : 'npx';
const python = os.platform() === 'win32' ? 'python' : 'python3';

// Step 1: try to install prebuilt native binaries unless the user wants to rebuild from source
if (!process.env.npm_config_build_from_source && conanOpts.length === 0) {
  console.log(chalk.cyan(`Trying to install prebuilt native binaries for ${os.platform()}-${os.arch()}...`));
  try {
    cp.execFileSync(npx, ['node-pre-gyp', 'install'], opts);
    native = true;
  } catch (e) {
    console.log(e);
    console.log(chalk.yellow('Failed...'));
    native = false;
  }
}

// Step 2: try rebuilding the native version from source unless we have the prebuilt binaries
if (!native || process.env.npm_config_build_from_source) {
  console.log(chalk.cyan(`Trying to rebuild from source for ${os.platform()}-${os.arch()}...`));
  try {
    console.log('Launching conan');
    if (verbose) console.log('conanOpts', conanOpts);
    cp.execFileSync(python, [ '-m', 'pip', 'install', '--user', 'conan'], opts);
    try {
      // If a default profile has already been created, this will fail, it is safe to ignore
      cp.execFileSync(python, [ '-m', 'conans.conan', 'profile', 'detect']);
    } catch { /**/ }
    cp.execFileSync(python, [ '-m', 'conans.conan', 'install', '.', '-pr:b=default', '-pr:h=./native.profile', '-of', 'build', '--build=missing', '--build=openjpeg', '-of', 'conan'], opts);

    console.log('Launching node-pre-gyp for native');
    cp.execFileSync(npx, ['node-pre-gyp', 'install', '--build-from-source'], opts);
    native = true;
  } catch (e) {
    if (verbose) console.log(e);
    console.log(chalk.yellow('Failed...'));
    native = false;
  }
}

// Step 3: try to install prebuilt WASM binaries - few users will need to rebuild these
console.log(chalk.cyan('Trying to install WASM binaries for emscripten-wasm32...'));
try {
  console.log('Launching node-pre-gyp for WASM');
  cp.execFileSync(npx,
    ['node-pre-gyp', 'install', '--target_platform=emscripten', '--target_arch=wasm32'],
    { env: { ...process.env, npm_config_build_from_source: undefined }, ...opts }
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
