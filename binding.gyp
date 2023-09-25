{
  'variables': {
    'shared_imagemagick%': 'false',
    'enable_asan%': 'false',
    'default_hdri': 'true',
    'enable_hdri%': '<(default_hdri)',
    'regen_swig%': 'false',
    'winbuildtype%': '/p:Configuration=Release,Platform=x64',
    'winlibid%': 'RL',
  },
  'target_defaults': {
    'includes': [
      'except.gypi'
    ],
    'configurations': {
      'Debug': {
        'defines': [
          'SWIGRUNTIME_DEBUG'
        ],
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
        '-Wno-unused-function'
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
        # Link against a system-installed ImageMagick
        ['shared_imagemagick == "true"', {
          'libraries': [ '<@(magicklibs)' ]
        }],
        # Link against the included ImageMagick
        ['shared_imagemagick == "false"', {
          'dependencies': [ 'imagemagick' ],
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
        }]
      ],
      'dependencies': [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      'sources': [
        'swig/Magick++.cxx'
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
    # Build the included ImageMagick library on POSIX
    ['OS != "win" and shared_imagemagick == "false"', {
      'targets': [{
        'conditions': [
          ['enable_hdri == "false"', {
            'variables': {
              'hdri': '--disable-hdri',
              'magickdefines': [ 'MAGICKCORE_HDRI_ENABLE=0', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
              'magicklibs': [ '-lMagick++-7.Q16', '-lMagickWand-7.Q16', '-lMagickCore-7.Q16' ]
            }
          }],
          ['enable_hdri == "true"', {
            'variables': {
              'hdri': '--enable-hdri',
              'magickdefines': [ 'MAGICKCORE_HDRI_ENABLE=1', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
              'magicklibs': [ '-lMagick++-7.Q16HDRI', '-lMagickWand-7.Q16HDRI', '-lMagickCore-7.Q16HDRI' ]
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
            'action': [ 'sh', 'build_magick.sh', '<(module_path)', '<(hdri)' ]
          }
        ],
        'direct_dependent_settings': {
          'defines': [ '<@(magickdefines)' ],
          'libraries': [
            '-L../deps/ImageMagick/Magick++/lib/.libs/',
            '-L../deps/ImageMagick/MagickWand/.libs/',
            '-L../deps/ImageMagick/MagickCore/.libs',
            '<@(magicklibs)',
            # This an ugly hack that enable running of shell commands during node-gyp configure
            # node-gyp configure needs to evaluate this expression to generate the platform-specific files
            # (originally by TooTallNate for libffi) 
            '<!@((pip3 install "conan<2.0.0" && cd build && conan install .. -pr:b=default -of build --build=missing --build=openjpeg) > /dev/null)',
            '<!@(bash configure_magick.sh <(module_path) <(hdri))'
          ]
        }
      }]
    }],
    # Build the included ImageMagick library on Windows
    ['OS == "win" and shared_imagemagick == "false"', {
      'targets': [{
        'conditions': [
          ['enable_hdri == "false"', {
            # TODO: Implement no-HDRI build on Windows
          }],
          ['enable_hdri == "true"', {
          }]
        ],
        'target_name': 'imagemagick',
        'type': 'none',
        'actions': [
          {
            'action_name': 'make',
            'inputs': [ '<(module_root_dir)/deps/ImageMagick-Windows/VisualMagick/VisualStaticMT.sln' ],
            'outputs': [ '<(module_root_dir)/deps/ImageMagick-Windows/VisualMagick/lib/CORE_<(winlibid)_Magick++_.lib' ],
            'action': [ '<(module_root_dir)/build_magick.bat', '<(module_path)', '<(winbuildtype)' ]
          }
        ],
        'direct_dependent_settings': {
          'conditions': [
            ['enable_hdri == "false"', {
              'defines': [ 'MAGICKCORE_HDRI_ENABLE=0', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
            }],
            ['enable_hdri == "true"', {
              'defines': [ 'MAGICKCORE_HDRI_ENABLE=1', 'MAGICKCORE_QUANTUM_DEPTH=16' ],
            }]
          ],
          'libraries': [
            'CORE_<(winlibid)_aom_.lib',
            'CORE_<(winlibid)_brotli_.lib',
            'CORE_<(winlibid)_bzlib_.lib',
            'CORE_<(winlibid)_cairo_.lib',
            'CORE_<(winlibid)_coders_.lib',
            'CORE_<(winlibid)_croco_.lib',
            'CORE_<(winlibid)_de265_.lib',
            'CORE_<(winlibid)_deflate_.lib',
            'CORE_<(winlibid)_exr_.lib',
            'CORE_<(winlibid)_ffi_.lib',
            'CORE_<(winlibid)_filters_.lib',
            'CORE_<(winlibid)_freetype_.lib',
            'CORE_<(winlibid)_fribidi_.lib',
            'CORE_<(winlibid)_glib_.lib',
            'CORE_<(winlibid)_harfbuzz_.lib',
            'CORE_<(winlibid)_heif_.lib',
            'CORE_<(winlibid)_highway_.lib',
            'CORE_<(winlibid)_jasper_.lib',
            'CORE_<(winlibid)_jpeg-turbo_.lib',
            'CORE_<(winlibid)_jpeg-xl_.lib',
            'CORE_<(winlibid)_lcms_.lib',
            'CORE_<(winlibid)_lqr_.lib',
            'CORE_<(winlibid)_lzma_.lib',
            'CORE_<(winlibid)_Magick++_.lib',
            'CORE_<(winlibid)_MagickCore_.lib',
            'CORE_<(winlibid)_MagickWand_.lib',
            'CORE_<(winlibid)_openjpeg_.lib',
            'CORE_<(winlibid)_pango_.lib',
            'CORE_<(winlibid)_pixman_.lib',
            'CORE_<(winlibid)_png_.lib',
            'CORE_<(winlibid)_raqm_.lib',
            'CORE_<(winlibid)_raw_.lib',
            'CORE_<(winlibid)_rsvg_.lib',
            'CORE_<(winlibid)_tiff_.lib',
            'CORE_<(winlibid)_webp_.lib',
            'CORE_<(winlibid)_xml_.lib',
            'CORE_<(winlibid)_zip_.lib',
            'CORE_<(winlibid)_zlib_.lib'
          ],
          # This is the Windows version of the same hack as above
          # Here we invoke the official ImageMagick-Windows downloader
          'inputs': [ '<!@(configure_magick.bat > configure.log)' ]
        }
      }]
    }]
  ]
}
