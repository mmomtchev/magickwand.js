{
  'variables': {
    'shared_imagemagick%': 'false',
    'enable_asan%': 'false',
    'default_hdri': 'true',
    'enable_hdri%': '<(default_hdri)',
    'regen_swig%': 'false'
  },
  'configurations': {
    'Debug': {
      'defines': [
        'SWIGRUNTIME_DEBUG'
      ]
    }
  },
  'conditions': [
    ['enable_hdri == "false"', {
    }],
    ['enable_hdri == "true"', {
      'defines': [ 'MAGICKCORE_HDRI_ENABLE=1', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
    }]
  ],
  'targets': [
    {
      'target_name': 'node-magickwand',
      'include_dirs': [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],      
      'cflags': [
        '-Wno-deprecated-declarations',
        '-Wno-unused-function'
      ],
      'cflags_cc': [
        '-std=c++11',
        '-Wno-type-limits',
        '-Wno-deprecated-copy'
      ],
      'cflags!': [ '-fno-exceptions', '-fno-rtti' ],
      'cflags_cc!': [ '-fno-exceptions', '-fno-rtti' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_RTTI': 'YES',
        'GCC_ENABLE_CPP_EXCEPTIONS' : 'YES'
      },
      'conditions': [
        ['enable_asan == "true"', {
          'cflags_cc': [ '-fsanitize=address' ]
        }],
        # Link against a system-installed ImageMagick
        ['shared_imagemagick == "true"', {
        }],
        # Link against the included ImageMagick
        ['shared_imagemagick == "false"', {
          'dependencies': [ 'imagemagick' ],
          'libraries': [
            '-L../deps/ImageMagick/Magick++/lib/.libs/ '
            '-L../deps/ImageMagick/MagickWand/.libs/ '
            '-L../deps/ImageMagick/MagickCore/.libs  ',
          ],
          'include_dirs': [
            'deps/ImageMagick/Magick++/lib',
            'deps/ImageMagick'
          ]
        }],
        # These defines must be present when building
        ['enable_hdri == "false"', {
          'defines': [ 'MAGICKCORE_HDRI_ENABLE=0', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
        }],
        ['enable_hdri == "true"', {
          'defines': [ 'MAGICKCORE_HDRI_ENABLE=1', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
        }],
        # Regenerate the SWIG wrappers when needed
        ['enable_hdri!=default_hdri or regen_swig=="true"', {
          'actions': [{
            'conditions': [
              ['enable_hdri == "false"', {
                'variables': {
                  'hdri': '-DMAGICKCORE_HDRI_ENABLE=0 -DMAGICKCORE_QUANTUM_DEPTH=16',
                }
              }],
              ['enable_hdri == "true"', {
                'variables': {
                  'hdri': '-DMAGICKCORE_HDRI_ENABLE=1 -DMAGICKCORE_QUANTUM_DEPTH=16',
                }
              }]
            ],
            'action_name': 'swig_wrappers',
            'inputs': [ 'src/Magick++.i' ],
            'outputs': [ 'build/swig/Magick++.cxx' ],
            'action': [
              'swig', '-javascript', '-napi', '-c++',
              '-Ideps/ImageMagick/Magick++/lib', '-Ideps/ImageMagick',
              '-DMAGICKCORE_HDRI_ENABLE=1', '-DMAGICKCORE_QUANTUM_DEPTH=16',
              '-o', 'build/swig/Magick++.cxx', 'src/Magick++.i'
            ]
          }]
        }]
      ],
      'dependencies': [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      'sources': [
        'build/swig/Magick++.cxx'
      ],
    },
    {
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
  ],
  'conditions': [
    # Build the included ImageMagick library
    ['shared_imagemagick == "false"', {
      'targets': [{
        'conditions': [
          ['enable_hdri == "false"', {
            'variables': {
              'hdri': '--disable-hdri',
            }
          }],
          ['enable_hdri == "true"', {
            'variables': {
              'hdri': '--enable-hdri',
            }
          }]
        ],
        'target_name': 'imagemagick',
        'type': 'none',
        'actions': [
          {
            'action_name': 'make',
            'inputs': [ '<(module_root_dir)/deps/ImageMagick/configure' ],
            'conditions': [
              ['enable_hdri == "false"', {
                'outputs': [ '<(module_root_dir)/deps/ImageMagick/Magick++/lib/.libs/libMagick++-7.Q16.a' ],
              }],
              ['enable_hdri == "true"', {
                'outputs': [ '<(module_root_dir)/deps/ImageMagick/Magick++/lib/.libs/libMagick++-7.Q16HDRI.a' ],
              }]
            ],
            'action': [ 'sh', '-c', 'cd <(module_root_dir)/deps/ImageMagick && env -i make -j4 && env -i make install' ]
          }
        ],
        'direct_dependent_settings': {
          'conditions': [
            ['enable_hdri == "false"', {
              'defines': [ 'MAGICKCORE_HDRI_ENABLE=0', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
              'libraries+': [
                '-lMagick++-7.Q16 -lMagickCore-7.Q16 -lMagickWand-7.Q16'
              ]
            }],
            ['enable_hdri == "true"', {
              'defines': [ 'MAGICKCORE_HDRI_ENABLE=1', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
              'libraries+': [
                '-lMagick++-7.Q16HDRI -lMagickCore-7.Q16HDRI -lMagickWand-7.Q16HDRI'
              ]
            }]
          ],
          # This an ugly hack that enable running of shell commands during node-gyp configure
          # node-gyp configure needs to evaluate this expression to generate the platform-specific files
          # (originally by TooTallNate for libffi) 
          'libraries': [ '<!@(sh configure_magick.sh <(module_path) <(hdri))' ]
        }
      }]
    }]
  ]
}
