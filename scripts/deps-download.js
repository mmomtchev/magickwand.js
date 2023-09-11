const cp = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

if (!fs.statSync(path.resolve(__dirname, '..', '.git'), { throwIfNoEntry: false })) {
  console.log('not a git checkout, skipping download');
  process.exit(0);
}

const generated_path = path.resolve(__dirname, '..', 'swig');
const source_path = path.resolve(__dirname, '..', 'src');

const hash = crypto.createHash('md5');
for (const file of fs.readdirSync(source_path, 'utf8').sort()) {
  const data = fs.readFileSync(path.resolve(source_path, file), 'utf8').replace(/\r\n/g, '\n');
  hash.update(data);
}
const message = hash.digest('hex');

console.log(`Will download dependencies for hash ${message} from origin/generated`);
cp.execSync('git fetch origin');
let commit;
try {
  commit = cp.execSync(`git log origin/generated --grep "${message}" --pretty=format:"%H"`)
    .toString().split('\n')[0].trimEnd();
  if (!commit) throw new Error;
  console.log(`Commit hash is ${commit}`);
} catch {
  console.error(`Generated files not published for ${message}`);
  process.exit(1);
}

async function download(url, targetFile) {
  console.log('downloading', url, 'to', targetFile);
  await fs.promises.mkdir(path.dirname(targetFile), { recursive: true });
  await fs.promises.rm(targetFile, { force: true });
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      const code = response.statusCode ?? 0;

      if (code >= 400) {
        return reject(new Error(response.statusMessage));
      }

      // handle redirects
      if (code > 300 && code < 400 && !!response.headers.location) {
        return resolve(
          download(response.headers.location, targetFile)
        );
      }

      // save the file to disk
      const fileWriter = fs
        .createWriteStream(targetFile)
        .on('finish', () => {
          fileWriter.close();
          resolve({});
        });

      response.pipe(fileWriter);
    }).on('error', error => {
      reject(error);
    });
  });
}

const q = [];
for (const file of [
  'magickcore.i',
  'Magick++.cxx',
  'magick++.i',
  'magickwand.i',
  'Magick++.d.ts'
]) {
  q.push(download(
    `https://raw.githubusercontent.com/mmomtchev/node-magickwand/${commit}/${file}`,
    path.resolve(generated_path, file)
  ));
}
Promise.all(q).then(() => console.log('done'));
