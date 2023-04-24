# node-magickwand
## This project serves three purposes:

* Testing grounds for the NAPI support in SWIG
* Provide alternative native bindings for ImageMagick in Node.js
* Indulge in hyper-reality

## Trying for yourself

The project is far from ready, but it could be usable

Only Linux is being worked on at the moment - you are on your own for other OSes

* If you want NAPI, get SWIG with NAPI support from https://github.com/mmomtchev/swig#mmom
  * Otherwise, building with the old Node/V8 interface might be possible
  * Alternatively, you can checkout the `generated` branch where all files have been pre-generated

* Recursively clone the repo
```shell
git clone --recursive https://github.com/mmomtchev/node-magickwand
cd node-magickwand
```

* Build ImageMagick
```shell
cd deps/ImageMagick
./configure
make -j4
```

* Install the npm dependencies
```shell
npm install
```

* Generate the C++ dependency graph
```shell
npm run deps
```

* Generate the C++ bindings code
```shell
npm run swig
```

* Build the Node.js addon
```shell
node-gyp configure && node-gyp build
```

* `npm test` should work at this point