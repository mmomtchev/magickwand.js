const cp = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

cp.execSync('git fetch origin generated');
const hashMain = cp.execSync('git rev-parse HEAD').toString().trimEnd();
const hashGen = cp.execSync(`git log generated  --grep "${hashMain}" --pretty=format:"%H"`).toString().trimEnd();
if (!hashGen.length)
  throw new Error('No pregenerated files for your version');

async function download(url, targetFile) {
  console.log('downloading', url, 'to', targetFile);
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
    `https://github.com/mmomtchev/node-magickwand/blob/${hashGen}/${file}`,
    path.resolve(__dirname, '..', 'build', 'swig', file)
  );
}
