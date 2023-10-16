const cp = require('child_process');
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

cp.execSync(`git --work-tree=${generated_path} checkout ${commit}`);
