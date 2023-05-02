{
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
        "<!@(node -p \"require('node-addon-api').include\")",
        'deps/ImageMagick/Magick++/lib',
        'deps/ImageMagick'
      ],
      'defines': [
      ],
      'libraries': [
        '-L../deps/ImageMagick/Magick++/lib/.libs/ -lMagick++-7.Q16 -L../deps/ImageMagick/MagickCore/.libs -lMagickCore-7.Q16'
      ],
      'ldflags': [
        '-Wl,-rpath \'$$ORIGIN/../../../deps/ImageMagick/Magick++/lib/.libs/\' -Wl,-rpath \'$$ORIGIN/../../../deps/ImageMagick/MagickCore/.libs\''
      ],
      'cflags': [
        '-Wno-deprecated-declarations',
        '-Wno-unused-function',
        #'-fsanitize=address'
      ],
      'cflags_cc': [
        '-std=c++11',
        '-Wno-type-limits',
        '-Wno-deprecated-copy',
        #'-fsanitize=address'
      ],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions', '-fno-rtti' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_RTTI': 'YES',
        'GCC_ENABLE_CPP_EXCEPTIONS' : 'YES'
      },
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'sources': [
        'build/swig/Magick++.cxx'
      ]
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [ "<(module_name)" ],
      "copies": [
        {
          "files": [
            "<(PRODUCT_DIR)/node-magickwand.node"
          ],
          "destination": "<(module_path)"
        }
      ]
    }
  ]
}
