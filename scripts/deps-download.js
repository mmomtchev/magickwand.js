const cp = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

let hash = '';
for (let i = 0; !hash.length; i++) {
  const hashMain = cp.execSync(`git rev-parse HEAD~${i}`).toString().trimEnd();
  hash = cp.execSync(`git log origin/generated  --grep "${hashMain}" --pretty=format:"%H"`).toString().trimEnd();
}

async function download(url, targetFile) {
  console.log('downloading', url, 'to', targetFile);
  await fs.promises.mkdir(path.dirname(targetFile), {recursive: true});
  return await new Promise((resolve, reject) => {
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

      fs.promises.rm(targetFile, {force: true});

      // save the file to disk
      const fileWriter = fs
        .createWriteStream(targetFile)
        .on('finish', () => {
          resolve({});
        });

      response.pipe(fileWriter);
    }).on('error', error => {
      reject(error);
    });
  });
}

for (const file of ['magickcore.i', 'Magick++.cxx', 'magick++.i', 'magickwand.i']) {
  download(
    `https://github.com/mmomtchev/node-magickwand/blob/${hash}/${file}`,
    path.resolve(__dirname, '..', 'build', 'swig', file)
  );
}
