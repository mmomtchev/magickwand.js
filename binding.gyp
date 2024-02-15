{
  # These are all the command-line switches and their default values
  'includes': [
    'arguments.gypi'
  ],
  'target_defaults': {
    # This is the result of many hours of hair-pulling:
    # https://github.com/nodejs/node-addon-api/issues/1379
    'includes': [
      'except.gypi'
    ],
    'configurations': {
      'Debug': {
        # Disable lazy-binding in debug mode
        # The goal is to check if we reference something that hasn't been packed
        'defines': [ 'DEBUG' ],
        'ldflags': [ '-Wl,-z,now' ],
        'xcode_settings': {
          'OTHER_LDFLAGS': [ '-Wl,-bind_at_load' ]
        },
        'conditions': [
          ['enable_asan == "true"', {
            'cflags_cc': [ '-fsanitize=address' ]
          }]
        ]
      },
      'Release': {
        'cflags_cc': [ '-O2' ],
        'defines': [ 'NDEBUG' ]
      }
    }
  },
  'targets': [
    {
      # The main binary target - both native or WASM
      'target_name': 'magickwand',
      'include_dirs': [
        '<!@(node -p "require(\'node-addon-api\').include")',
        '<(module_root_dir)'
      ],
      'cflags': [
        '-Wno-deprecated-declarations',
        '-Wno-unused-function',
      ],
      'cflags_cc': [
        '-std=c++11',
        '-Wno-type-limits',
        '-Wno-deprecated-copy'
      ],
      'xcode_settings': {
        'OTHER_CFLAGS': [
          # SWIG has defines containing throw or goto
          # and/or functions that always throw (clang version)
          '-Wno-sometimes-uninitialized',
        ]
      },
      'msvs_settings': {
        'VCCLCompilerTool': {
          # PREfast requires too much memory for Github Actions
          'EnablePREfast': 'false',
          'AdditionalOptions': [
            # SWIG Node-API uses deliberate shadowing inside inner scopes
            '/wo6246',
            '/wo28182'
          ]
        }
      },
      'conditions': [
        # Emscripten compilation options
        ['target_platform == "emscripten"', {
          'variables': {
            'emscripten_pthread': [
              # Emscripten + emnapi libuv multithreading
              '-pthread',
              '-DEMNAPI_WORKER_POOL_SIZE=4'
            ]
          },
          'cflags': [
            # SWIG has defines containing throw or goto
            # and/or functions that always throw (clang version)
            '-Wno-sometimes-uninitialized',
		        '-sNO_DISABLE_EXCEPTION_CATCHING',
            '<@(emscripten_pthread)'
          ],
          'ldflags': [
            # This one is used for unit testing, it is only 4Kb
		        '--embed-file=<(module_root_dir)/test/data/wizard.gif@wizard.gif',
            # These are needed by ImageMagick
            '--embed-file=<(module_path)/ImageMagick/etc/ImageMagick-7/policy.xml@policy.xml',
            '--embed-file=<(module_path)/ImageMagick/etc/ImageMagick-7/colors.xml@colors.xml',
            '--embed-file=<(module_path)/ImageMagick/etc/ImageMagick-7/log.xml@log.xml',
            '--embed-file=<(module_path)/ImageMagick/share/ImageMagick-7/locale.xml@locale.xml',
            '--embed-file=<(module_path)/ImageMagick/share/ImageMagick-7/english.xml@english.xml',
            # SWIG Node-API uses exceptions extensively (for now, an exception-less version is coming)
		        '-sNO_DISABLE_EXCEPTION_CATCHING',
            # We live in the ES6 / bundlers era - these produce a bundler-friendly ES6
            '-sMODULARIZE',
            '-sEXPORT_NAME=Magick',
            '-sEXPORT_ES6',
            '-sUSE_ES6_IMPORT_META',
            # Node.js has its own native modules and Node.js compatibility
            # in the loader requires kludges in webpack 
            '-sENVIRONMENT=web,webview,worker',
            # Emscripten cannot grow the stack size (yes, it feels so MS-DOS/1980s)
            # On the other side ImageMagick's PNG implementation is
            # a particularly voracious stack consumer
            '-sSTACK_SIZE=2MB',
            '<@(emscripten_pthread)',
            '-sDEFAULT_PTHREAD_STACK_SIZE=2MB',
            # This is the number of async background workers in the emulated libuv pool
            '-sPTHREAD_POOL_SIZE=4',
          ]
        }, {
          'cflags': [
            # SWIG has defines containing throw or goto
            # and/or functions that always throw (gcc version)
            '-Wno-maybe-uninitialized'
          ]
        }],
        # Link against a system-installed ImageMagick
        ['shared_imagemagick == "true"', {
          'libraries': [ '<@(magicklibs)' ]
        }],
        # Link against the included ImageMagick
        ['shared_imagemagick == "false"', {
          'dependencies': [ 'deps/imagemagick.gyp:imagemagick' ],
        }],
        # These defines must be present when building
        ['enable_hdri == "false"', {
          'defines': [ 'MAGICKCORE_HDRI_ENABLE=0', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
        }],
        ['enable_hdri == "true"', {
          'defines': [ 'MAGICKCORE_HDRI_ENABLE=1', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
        }],
        # Regenerate the SWIG wrappers when needed (this is currently broken)
        ['enable_hdri!="true" or regen_swig=="true"', {
          'actions': [{
            'conditions': [
              ['enable_hdri == "false"', {
                'variables': {
                  'hdri': [ '-DMAGICKCORE_HDRI_ENABLE=0', '-DMAGICKCORE_QUANTUM_DEPTH=16' ],
                }
              }],
              ['enable_hdri == "true"', {
                'variables': {
                  'hdri': [ '-DMAGICKCORE_HDRI_ENABLE=1', '-DMAGICKCORE_QUANTUM_DEPTH=16' ],
                }
              }]
            ],
            'action_name': 'swig_wrappers',
            'inputs': [ 'src/Magick++.i' ],
            'outputs': [ 'swig/magickwand.js.cxx' ],
            'action': [
              'swig', '-javascript', '-typescript', '-napi', '-c++',
              '-Ideps/ImageMagick/Magick++/lib', '-Ideps/ImageMagick',
              '<@(hdri)',
              '-o', 'swig/Magick++.cxx',
              '-outdir', 'swig',
              'src/Magick++.i'
            ]
          }]
        }]
      ],
      # These are the wrappers sources generated by SWIG
      'sources': [
        '<!@(node -p "fs.readdirSync(\'swig\').filter((f) => f.match(/cxx$/)).map((f) => \'swig/\' + f).join(\' \')")'
      ]
    }
  ],
  'conditions': [
    ['target_platform != "emscripten"', {
      'targets': [
        {
          # Copy the final binary native DLL
          'target_name': 'action_after_build',
          'type': 'none',
          'dependencies': [ '<(module_name)' ],
          'copies': [
            {
              'files': [
                '<(PRODUCT_DIR)/magickwand.node'
              ],
              'destination': '<(module_path)'
            }
          ]
        }
      ]
    }],
    ['target_platform == "emscripten"', {
      # WASM does not support an external ImageMagick
      # builtins pulls conan and emsdk
      # wasm enables the cross-compilation
      'includes': [
        'conan/conan_compiler.gypi'
      ],
      'targets': [
        {
          # Copy the final binary WASM
          'target_name': 'action_after_build',
          'type': 'none',
          'dependencies': [ '<(module_name)', 'dummy_produce_wasm' ],
          'copies': [
            {
              'files': [
                '<(PRODUCT_DIR)/magickwand.js',
                '<(PRODUCT_DIR)/magickwand.worker.js',
                '<(PRODUCT_DIR)/magickwand.wasm'
              ],
              'destination': '<(module_path)'
            }
          ]
        },
        {
          # Dummy action to signal gyp that .wasm is produced with .js
          'target_name': 'dummy_produce_wasm',
          'type': 'none',
          'actions': [{
            'action_name': 'dummy_action_wasm',
            'inputs': [ '<(PRODUCT_DIR)/magickwand.js' ],
            'outputs': [
              '<(PRODUCT_DIR)/magickwand.wasm',
              '<(PRODUCT_DIR)/magickwand.worker.js'
            ],
            'action': [ 'true' ]
          }]
        }
      ]
    }]
  ]
}
