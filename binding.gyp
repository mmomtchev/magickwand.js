{
  'variables': {
    'shared_imagemagick%': 'false',
    'enable_asan%': 'false',
    'enable_hdri%': 'true',
    'regen_swig%': 'false',
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
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'cflags': [
        '-Wno-deprecated-declarations',
        '-Wno-unused-function',
        # clang does not properly identify SWIG defines containing throw or goto
        '-Wno-sometimes-uninitialized'
      ],
      'cflags_cc': [
        '-std=c++11',
        '-Wno-type-limits',
        '-Wno-deprecated-copy'
      ],
      'msvs_settings': {
        'VCCLCompilerTool': {
          # PREfast requires too much memory for Github Actions
          'EnablePREfast': 'false',
          'AdditionalOptions': [
            # SWIG Node-API uses deliberate shadowing inside inner scopes
            '/wo6246',
            '/wo28182'
          ]
        },
        'VCLinkerTool': {
          'AdditionalLibraryDirectories': '<(module_root_dir)/deps/ImageMagick-Windows/VisualMagick/lib'
        }
      },
      'conditions': [
        # Emscripten compilation options
        ['target_arch == "wasm32"', {
          'cflags': [
		        '-sNO_DISABLE_EXCEPTION_CATCHING'
          ],
          'ldflags': [
		        '--embed-file=<(module_root_dir)/test/data/wizard.gif@wizard.gif',
		        '-sNO_DISABLE_EXCEPTION_CATCHING',
            '-sMODULARIZE'
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
            'outputs': [ 'swig/Magick++.cxx' ],
            'action': [
              'swig', '-javascript', '-typescript', '-napi', '-c++',
              '-Ideps/ImageMagick/Magick++/lib', '-Ideps/ImageMagick',
              '<@(hdri)',
              '-o', 'swig/Magick++.cxx',
              '-outdir', 'swig',
              'src/Magick++.i'
            ]
          }]
        }],
        ['target_arch != "wasm32"', {
          'sources': [
            'swig/Magick++.cxx'
          ]
        },
        {
          'sources': [
            'swig/wasm/Magick++.cxx',
          ]
        }]
      ]
    }
  ],
  'conditions': [
    ['target_arch != "wasm32"', {
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
    ['target_arch == "wasm32"', {
      # WASM does not support an external ImageMagick
      'variables': {
        'target_platform': 'wasm',
        'emcc_path': '<!((pip3 install --user "conan<2.0.0" && cd build && python3 -m conans.conan install .. -pr:b=default -pr:h=../emscripten.profile -of build --build=missing) > /dev/null)'
      },
      'includes': [
        'wasm.gypi'
      ],
      'targets': [
        {
          # Copy the final binary WASM
          'target_name': 'action_after_build',
          'type': 'none',
          'dependencies': [ '<(module_name)' ],
          'copies': [
            {
              'files': [
                '<(PRODUCT_DIR)/node-magickwand.js',
                '<(PRODUCT_DIR)/node-magickwand.wasm'
              ],
              'destination': '<(module_path)'
            }
          ]
        }
      ]
    }]
  ]
}
