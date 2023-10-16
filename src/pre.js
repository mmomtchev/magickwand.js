// This is the empscripten preamble
// It is needed to load the JS worker when running in a WebWorker

var Module = {
  ...(Module || {}),
  'mainScriptUrlOrBlob': 'node-magickwand.js'
};
