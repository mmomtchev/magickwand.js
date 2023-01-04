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
        '/usr/include/ImageMagick-6',
        '/usr/include/x86_64-linux-gnu/ImageMagick-6'
      ],
      'defines': [
        'BUILDING_NODE_EXTENSION=1',
        'MAGICKCORE_QUANTUM_DEPTH=16',
        'MAGICKCORE_HDRI_ENABLE=0'
      ],
      'libraries': [
        '-lMagick++-6.Q16'
      ],
      'cflags': [
        '-Wno-deprecated-declarations',
        '-Wno-unused-function'
      ],
      'cflags_cc': [
        '-std=c++11'
      ],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions', '-fno-rtti' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_RTTI': 'YES',
        'GCC_ENABLE_CPP_EXCEPTIONS' : 'YES'
      },
      'sources': [
        'build/Magick++.cxx'
      ]
    }
  ]
}
