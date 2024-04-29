var _a, _b, _c, _d;
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as https from 'node:https';
import * as process from 'node:process';
import * as os from 'node:os';
import * as tar from 'tar';
import { fileURLToPath } from 'node:url';
var destination;
switch (os.platform()) {
    default:
    case 'linux':
        destination = path.resolve((_a = process.env.HOME) !== null && _a !== void 0 ? _a : '/tmp', '.cache', 'node-hadron', process.release.name, process.version);
        break;
    case 'win32':
        destination = path.resolve((_c = (_b = process.env.LOCALAPPDATA) !== null && _b !== void 0 ? _b : process.env.USERPROFILE) !== null && _c !== void 0 ? _c : '\\', 'node-hadron', process.release.name, process.version);
        break;
    case 'darwin':
        destination = path.resolve((_d = process.env.HOME) !== null && _d !== void 0 ? _d : '/tmp', 'Library', 'Caches', 'node-hadron', process.release.name, process.version);
        break;
}
var download = true;
try {
    fs.statSync(path.resolve(destination, 'include', 'node', 'node_api.h'));
    download = false;
}
catch (_e) {
    console.log("Downloading ".concat(process.release.headersUrl, " to ").concat(destination));
}
function retrieve(url, target) {
    https.get(url, function (response) {
        try {
            var destination_1 = url.endsWith('.tar.gz') ?
                tar.x({
                    C: target,
                    strip: 1
                }) :
                fs.createWriteStream(target);
            response.pipe(destination_1);
        }
        catch (e) {
            console.error(e);
        }
    });
}
var environment = '[properties]\n';
try {
    if (process.release.headersUrl) {
        fs.mkdirSync((destination), { recursive: true });
        if (download)
            retrieve(process.release.headersUrl, destination);
        environment += "node_api_include = '".concat(path.resolve(destination, 'include', 'node').replace(/\\/g, '\\\\'), "'\n");
    }
    if (process.release.libUrl) {
        var target = path.resolve(path.resolve(destination, 'lib'), path.basename(process.release.libUrl));
        fs.mkdirSync(path.dirname(target), { recursive: true });
        if (download)
            retrieve(process.release.libUrl, target);
        environment += "node_lib = '".concat(target.replace(/\\/g, '\\\\'), "'\n");
    }
}
catch (e) {
    console.error(e);
}
fs.mkdirSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'build'), { recursive: true });
fs.writeFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'build', 'napi.ini'), environment, function (error) {
    if (error)
        console.error(error);
});
