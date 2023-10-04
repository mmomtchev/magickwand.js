const fs = require('fs');
const im = require('..');

const syms = Object.keys(im);

let es6 = 'import im from \'./index.cjs\';\n';
for (const symbol of syms) {
  es6 += `const { ${symbol} } = im;\n`;
  es6 += `export { ${symbol} };\n\n`;
}

fs.writeFileSync(process.argv[2], es6, 'utf-8');
