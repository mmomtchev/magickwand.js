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
        'BUILDING_NODE_EXTENSION=1',
        'MAGICKCORE_QUANTUM_DEPTH=16',
        'MAGICKCORE_HDRI_ENABLE=1'
      ],
      'libraries': [
        '-Ldeps/ImageMagick/Magick++/lib/.libs/ -lMagick++-7.Q16HDRI'
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
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions', '-fno-rtti' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_RTTI': 'YES',
        'GCC_ENABLE_CPP_EXCEPTIONS' : 'YES'
      },
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'sources': [
        'build/Magick++.cxx'
      ]
    }
  ]
}
