const cp = require('node:child_process');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert');

/**
 * npm options parser
 * 
 */


const quote = os.platform() == 'win32' ? '"' : '\'';

// These are always set by npm with a special meaning
// that is not the meson meaning
const mesonBlacklist = ['prefix'];

function setXPackPath() {
  const xpacks = path.resolve(__dirname, '..', 'xpacks', '.bin');
  process.env['PATH'] += path.delimiter + xpacks;
}

function mesonBuildOptions() {
  let o, r;

  setXPackPath();
  try {
    o = cp.execSync('meson introspect --buildoptions meson.build -f');
  } catch (e) {
    console.error('Failed getting options from meson', e, e.stdout.toString(), e.stderr.toString());
    throw e;
  }

  try {
    r = JSON.parse(o.toString());
    assert(r.buildoptions);
  } catch (e) {
    console.error('Failed parsing meson output', e);
    throw e;
  }

  return r.buildoptions;
}

function conanBuildOptions() {
  let o, r;

  setXPackPath();
  console.info(`retrieving conan options, PATH=${process.env.PATH}`);
  try {
    o = cp.execSync('conan inspect -f json .');
  } catch (e) {
    console.error('Failed getting options from conan', e, e.stdout.toString(), e.stderr.toString());
    throw e;
  }

  try {
    r = JSON.parse(o.toString());
    assert(r.options_definitions);
  } catch (e) {
    console.error('Failed parsing meson output', e);
    throw e;
  }

  return r.options_definitions;
}

function parseMesonOptions(env, mesonOptions) {
  let result = '';

  for (const opt of mesonOptions) {
    if (mesonBlacklist.includes(opt.name))
      continue;

    const envName = opt.name.replace('-', '_');
    //console.info('found option', opt.name, envName, opt.type);
    switch (opt.type) {
      case 'string':
        {
          const val = env[`npm_config_${envName}`];
          if (val) {
            console.info(` - meson options - ${opt.name} = "${val}" from npm CLI options`);
            result += ` -D${opt.name}=${quote}${val}${quote}`;
          }
        }
        break;
      case 'boolean':
        {
          const enable = env[`npm_config_enable_${envName}`];
          const disable = env[`npm_config_disable_${envName}`];
          if (enable && disable) {
            throw new Error(`Both enable and disable are present for ${opt.name}`);
          } else if (enable) {
            console.info(` - meson options ${opt.name} = True from npm CLI options`);
            result += ` -D${opt.name}=True`;
          } else if (disable) {
            console.info(` - meson options ${opt.name} = False from npm CLI options`);
            result += ` -D${opt.name}=False`;
          }
        }
        break;
      case 'array':
        {
          const val = env[`npm_config_${envName}`];
          if (val) {
            console.info(` - meson options - ${opt.name} = "${val}" from npm CLI options`);
            result += ` -D${opt.name}=${quote}${val}${quote}`;
          }
        }
        break;
    }

  }
  return result;
}

function parseConanOptions(env, conanOptions) {
  let result = '';

  for (const opt of Object.keys(conanOptions)) {
    const envName = opt.replace('-', '_');
    const enable = env[`npm_config_enable_${envName}`];
    const disable = env[`npm_config_disable_${envName}`];
    const string = env[`npm_config_${envName}`];
    //console.info('found option', opt, envName);

    if (enable && disable) {
      throw new Error(`Both enable and disable are present for ${opt}`);
    } else if (enable) {
      if (conanOptions[opt].includes('True')) {
        console.info(` - conan options - ${opt} = True from npm CLI options`);
        result += ` -o ${opt}=True`;
      } else {
        throw new Error(`${opt} does not support True setting`);
      }
    } else if (disable) {
      if (conanOptions[opt].includes('True')) {
        console.info(` - conan options - ${opt} = False from npm CLI options`);
        result += ` -o ${opt}=False`;
      } else {
        throw new Error(`${opt} does not support False setting`);
      }
    } else if (string) {
      if (conanOptions[opt].includes(string)) {
        console.info(` - conan options - ${opt} = ${string} from npm CLI options`);
        result += ` -o ${opt}=${quote}${string}${quote}`;
      } else {
        throw new Error(`${opt} does not support "${string}" setting`);
      }
    }

    switch (opt.type) {
      case 'string':
        {
          const val = env[`npm_config_${envName}`];
          if (val) {
            console.info(` - ${opt.name} = "${val}" from npm CLI options`);
            result += ` -D${opt.name}=${quote}${val}${quote}`;
          }
        }
        break;
      case 'boolean':
        {
          if (enable && disable) {
            throw new Error(`Both enable and disable are present for ${opt.name}`);
          } else if (enable) {
            console.info(` - ${opt.name} = True from npm CLI options`);
            result += ` -D${opt.name}=True`;
          } else if (disable) {
            console.info(` - ${opt.name} = False from npm CLI options`);
            result += ` -D${opt.name}=False`;
          }
        }
        break;
      case 'array':
        {
          const val = env[`npm_config_${envName}`];
          if (val) {
            console.info(` - ${opt.name} = "${val}" from npm CLI options`);
            result += ` -D${opt.name}=${quote}${val}${quote}`;
          }
        }
        break;
    }

  }
  return result;
}


module.exports = function () {
  this.registerTag('mesonOptions', class MesonOptions {
    render(context) {
      return parseMesonOptions(context.environments.env, mesonBuildOptions());
    }
  });
  this.registerTag('conanOptions', class ConanOptions {
    render(context) {
      return parseConanOptions(context.environments.env, conanBuildOptions());
    }
  });
};
