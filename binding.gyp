{
  'variables': {
    'shared_imagemagick%': 'false',
    'enable_asan%': 'false',
    'enable_hdri%': 'true',
    'regen_swig%': 'false',
    'target_platform%': 'os'
  },
  'target_defaults': {
    'includes': [
      'except.gypi'
    ],
    'configurations': {
      'Debug': {
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
      'target_name': 'node-magickwand',
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
		        '--embed-file=<(module_root_dir)/test/data/wizard.gif@wizard.gif',
            '--embed-file=<(module_path)/ImageMagick/etc/ImageMagick-7/policy.xml@policy.xml',
            '--embed-file=<(module_path)/ImageMagick/etc/ImageMagick-7/colors.xml@colors.xml',
            '--embed-file=<(module_path)/ImageMagick/etc/ImageMagick-7/log.xml@log.xml',
            '--embed-file=<(module_path)/ImageMagick/share/ImageMagick-7/locale.xml@locale.xml',
            '--embed-file=<(module_path)/ImageMagick/share/ImageMagick-7/english.xml@english.xml',
		        '-sNO_DISABLE_EXCEPTION_CATCHING',
            '-sMODULARIZE',
            '-sENVIRONMENT=web,webview,worker',
            '-sEXPORT_NAME=Magick',
            '--pre-js=<(module_root_dir)/src/pre.js',
            # Emscripten cannot grow the stack size (yes, it feels so MS-DOS/1980s)
            # On the other side ImageMagick's PNG implementation is
            # a particularly voracious stack consumer
            '-sSTACK_SIZE=1MB',
            '<@(emscripten_pthread)',
            '-sDEFAULT_PTHREAD_STACK_SIZE=1MB',
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
            'outputs': [ 'swig/node-magickwand.cxx' ],
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
      'sources': [
        '<!@(ls swig/node-magickwand*.cxx)'
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
                '<(PRODUCT_DIR)/node-magickwand.node'
              ],
              'destination': '<(module_path)'
            }
          ]
        }
      ]
    }],
    ['target_platform == "emscripten"', {
      # WASM does not support an external ImageMagick
      'variables': {
        # This an ugly hack that enable running of shell commands during node-gyp configure
        # node-gyp configure needs to evaluate this expression to generate the platform-specific files
        # (originally by TooTallNate for libffi) 
        'conaninfo': '<!((pip3 install --user "conan<2.0.0" && conan config set general.skip_broken_symlinks_check=true && cd build && python3 -m conans.conan install .. -pr:b=default -pr:h=../emscripten.profile -of build --build=missing) > /dev/null)'
      },
      'includes': [
        'wasm.gypi'
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
                '<(PRODUCT_DIR)/node-magickwand.js',
                '<(PRODUCT_DIR)/node-magickwand.worker.js',
                '<(PRODUCT_DIR)/node-magickwand.wasm'
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
            'inputs': [ '<(PRODUCT_DIR)/node-magickwand.js' ],
            'outputs': [
              '<(PRODUCT_DIR)/node-magickwand.wasm',
              '<(PRODUCT_DIR)/node-magickwand.worker.js'
            ],
            'action': [ 'true' ]
          }]
        }
      ]
    }]
  ]
}
