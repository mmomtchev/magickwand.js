# Based on https://github.com/toyobayashi/emnapi-node-gyp-test/blob/main/wasm/common.gypi
{
  'variables': {
    'OS': 'emscripten',
    'clang': 1,
    'target_arch%': 'wasm32',
    'target_platform%': 'emscripten',
    'wasm_threads%': 0,
    'product_extension%': 'js',
  },
  'target_defaults': {
    'type': 'executable',
    'product_extension': '<(product_extension)',
    'cflags': [
      '-Wall',
      '-Wextra',
      '-Wno-unused-parameter',
      '-sDEFAULT_TO_CXX=0',
    ],
    'ldflags': [
      '--js-library=<!(node -p "require(\'emnapi\').js_library")',
      '-sALLOW_MEMORY_GROWTH=1',
      '-sEXPORTED_FUNCTIONS=["_napi_register_wasm_v1","_malloc","_free"]',
      '-sEXPORTED_RUNTIME_METHODS=["FS"]',
      '-sNODEJS_CATCH_EXIT=0',
      '-sNODEJS_CATCH_REJECTION=0',
      '-sAUTO_JS_LIBRARIES=0',
      '-sAUTO_NATIVE_LIBRARIES=0',
      '--bind'
    ],
    'defines': [
      '__STDC_FORMAT_MACROS',
    ],
    'include_dirs': [
      '<!(node -p "require(\'emnapi\').include")',
    ],
    'sources': [
      '<!@(node -p "require(\'emnapi\').sources.map(x => JSON.stringify(path.relative(process.cwd(), x))).join(\' \')")'
    ],
    'default_configuration': 'Release',
    'configurations': {
      'Debug': {
        'defines': [ 'DEBUG', '_DEBUG' ],
        'cflags': [ '-g', '-O1',  ],
        'ldflags': [ '-sSAFE_HEAP=1', '-gsource-map', '-sASSERTIONS=2', '-sSTACK_OVERFLOW_CHECK=2' ],
      },
      'Release': {
        'cflags': [ '-O3' ],
        'ldflags': [ '-O3' ],
      }
    },
    'conditions': [
      ['target_arch == "wasm64"', {
        'cflags': [
          '-sMEMORY64=1',
        ],
        'ldflags': [
          '-sMEMORY64=1'
        ]
      }],
      ['wasm_threads == 1', {
        'cflags': [ '-pthread' ],
        'ldflags': [ '-pthread' ],
      }]
    ]
  }
}
