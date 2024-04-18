import * as fs from 'node:fs';
import * as path from 'node:path';
import * as https from 'node:https';
import * as process from 'node:process';
import * as os from 'node:os';
import * as tar from 'tar';
import { fileURLToPath } from 'node:url';

let destination: string;
switch (os.platform()) {
  default:
  case 'linux':
    destination = path.resolve(process.env.HOME ?? '/tmp', '.cache', 'node-hadron', process.release.name, process.version);
    break;
  case 'win32':
    destination = path.resolve(process.env.LOCALAPPDATA ?? process.env.USERPROFILE ?? '\\', 'node-hadron', process.release.name, process.version);
    break;
  case 'darwin':
    destination = path.resolve(process.env.HOME ?? '/tmp', 'Library', 'Caches', 'node-hadron', process.release.name, process.version);
    break;
}

let download = true;
try {
  fs.statSync(path.resolve(destination, 'include', 'node', 'node_api.h'));
  download = false;
} catch {
  console.log(`Downloading ${process.release.headersUrl} to ${destination}`);
}

function retrieve(url: string, target: string) {
  https.get(url, function (response) {
    try {
      const destination = url.endsWith('.tar.gz') ?
        tar.x({
          C: target,
          strip: 1
        }) :
        fs.createWriteStream(target);
      response.pipe(destination);
    } catch (e) {
      console.error(e);
    }
  });
}
let environment = '[properties]\n';

try {
  if (process.release.headersUrl) {
    fs.mkdirSync((destination), { recursive: true });
    if (download) retrieve(process.release.headersUrl, destination);
    environment += `node_api_include = '${path.resolve(destination, 'include', 'node').replace(/\\/g, '\\\\')}'\n`;
  }
  if (process.release.libUrl) {
    const target = path.resolve(path.resolve(destination, 'lib'), path.basename(process.release.libUrl));
    fs.mkdirSync(path.dirname(target), { recursive: true });
    if (download) retrieve(process.release.libUrl, target);
    environment += `node_lib = '${target.replace(/\\/g, '\\\\')}'\n`;
  }
} catch (e) {
  console.error(e);
}

fs.writeFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'build', 'napi.ini'), environment, (error) => {
  if (error) console.error(error);
});
