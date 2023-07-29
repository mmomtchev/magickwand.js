const cp = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

if (!fs.statSync(path.resolve(__dirname, '..', '.git'), {throwIfNoEntry: false})) {
  console.log('not a git checkout, skipping download');
  process.exit(0);
}

const branch = cp.execSync('git branch --show-current').toString().trimEnd();
if (branch !== 'main') {
  console.log(`on branch ${branch}`);
}
cp.execSync('git fetch origin');
let hash = '';
for (let i = 0; !hash.length; i++) {
  const hashMain = cp.execSync(`git rev-parse HEAD~${i}`).toString().trimEnd();
  try {
    hash = cp.execSync(`git log origin/generated${branch !== 'main' ? `-${branch}` : ''} --grep "${hashMain}" --pretty=format:"%H"`)
      .toString().split('\n')[0].trimEnd();
  } catch {
    console.error('unknown branch?');
    process.exit(0);
  }
}

async function download(url, targetFile) {
  console.log('downloading', url, 'to', targetFile);
  await fs.promises.mkdir(path.dirname(targetFile), {recursive: true});
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
for (const file of ['magickcore.i', 'Magick++.cxx', 'magick++.i', 'magickwand.i']) {
  q.push(download(
    `https://raw.githubusercontent.com/mmomtchev/node-magickwand/${hash}/${file}`,
    path.resolve(__dirname, '..', 'swig', file)
  ));
}
Promise.all(q).then(() => console.log('done'));
