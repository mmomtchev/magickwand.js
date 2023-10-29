# Environment tests

These can also be used as configuration examples for the different supported environments.

## Browser

Test runs:
```shell
npm install
npm install magickwand.js
npm run build
# Then loads index in Chrome via karma with COOP/COEP enabled
```

* `browser-webpack-esm` browser, webpack, ES6 modules, `"type": "module"`
* `browser-webpack-ts-cjs` browser, webpack, TypeScript transpiled to CJS
* `browser-webpack-ts-esm` browser, webpack, TyptScript transpiled to ES6, `"type": "module"`
* `browser-rollup-esm` browser, rollup, ES6 modules, `"type": "module"`
* `browser-react-ts` browser, React, create-react-app, TypeScript transpiled to CJS

# Node.js

Test runs:
```shell
npm install
npm install magickwand.js
npm test
```

* `node-cjs` Node.js, CommonJS
* `node-esm` Node.js, ES6 modules, `"type": "module"`
* `node-ts-cjs` Node.js, TypeScript transpiled to CJS
* `node-ts-esm` Node.js, TypeScript transpiled to ES6, `"type": "module"`

Also, if using Node.js 20 + TypeScript + ES6 modules, you should be aware of https://github.com/TypeStrong/ts-node/issues/1997
