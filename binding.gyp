{
  'variables': {
    'shared_imagemagick%': 'false',
    'enable_asan%': 'false',
    'enable_hdri%': 'false'
  },
  'configurations': {
    'Debug': {
      'defines': [
        'SWIGRUNTIME_DEBUG'
      ]
    }
  },
  'targets': [
    {
      'target_name': 'node-magickwand',
      'include_dirs': [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [
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
        ['shared_imagemagick == "true"', {
          'libraries': [
            '-lMagickCore-7.Q16'
          ]
        }],
        ['shared_imagemagick == "false"', {
          'dependencies': [ 'builtin_imagemagick' ],
          'libraries': [
            '-L../deps/ImageMagick/Magick++/lib/.libs/ -lMagick++-7.Q16 -L../deps/ImageMagick/MagickCore/.libs -lMagickCore-7.Q16'
          ],
          'include_dirs': [
            'deps/ImageMagick/Magick++/lib',
            'deps/ImageMagick'
          ]
        }]
      ],
      'dependencies': [
        'swig_wrappers',
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      'sources': [
        'build/swig/Magick++.cxx'
      ],
    },
    {
      'target_name': 'swig_wrappers',
      'type': 'none',
      'actions': [{
        'action_name': 'download_swig_wrappers',
        'inputs': [ '<(module_root_dir)/scripts/deps-download.js' ],
        'outputs': [ '<(module_root_dir)/build/swig/Magick++.cxx' ],
        'action': [ 'node', 'scripts/deps-download.js' ]
      }]
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
    ['shared_imagemagick == "false"', {
      'targets': [{
        'target_name': 'builtin_imagemagick',
        'type': 'none',
        'actions': [
          {
            'action_name': 'configure',
            'inputs': [ '<(module_root_dir)/deps/ImageMagick/configure' ],
            'outputs': [ '<(module_root_dir)/deps/ImageMagick/config.status' ],
            'action': [
              'sh',
              '-c',
              'cd <(module_root_dir)/deps/ImageMagick && sh ./configure --disable-hdri --disable-shared --enable-static CFLAGS="-fPIC" CXXFLAGS="-fPIC"'
            ]
          },
          {
            'action_name': 'make',
            'inputs': [ '<(module_root_dir)/deps/ImageMagick/config.status' ],
            'outputs': [ '<(module_root_dir)/deps/ImageMagick/Magick++/lib/.libs/libMagick++-7.Q16.a' ],
            'action': [ 'sh', '-c', 'cd <(module_root_dir)/deps/ImageMagick && make -j4' ]
          }
        ]
      }]
    }]
  ]
}
