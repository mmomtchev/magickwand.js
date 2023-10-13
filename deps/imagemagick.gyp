{
  'variables': {
    'enable_hdri%': 'true',
    'winbuildtype%': '/p:Configuration=Release,Platform=x64',
    'winlibid%': 'RL',
    'target_platform%': 'os'
  },
  'conditions': [
    ['target_platform == "wasm"', {
      'includes': [
        '../wasm.gypi'
      ]
    }],
    # TODO: Implement no-HDRI build on Windows
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
  'direct_dependent_settings': {
    'defines': [ '<@(magickdefines)' ],
    'include_dirs': [
      '<(module_root_dir)/deps/ImageMagick/Magick++/lib',
      '<(module_root_dir)/deps/ImageMagick'
    ]
  },
  'targets': [{
    'target_name': 'imagemagick',
    # It is in fact a static_library but we do everything manually
    'type': 'none',
    'conditions': [
      # On WASM conan is already installed by the main gyp
      ['target_platform != "wasm" and (OS == "linux" or OS =="mac")', {
        'variables': {
          'conaninfo': '<!((pip3 install --user "conan<2.0.0" && cd ../build && python3 -m conans.conan install .. -pr:b=default -pr:h=default -of build --build=missing --build=openjpeg) > /dev/null)'
        }
      }],
      # Linux / macOS / WASM build
      # (the WASM build is very similar to a POSIX build)
      ['target_platform == "wasm" or OS == "linux" or OS =="mac"', {
        'actions': [
          {
            'action_name': 'make',
            'inputs': [ '<(module_root_dir)/deps/ImageMagick/configure' ],
            'conditions': [
              ['enable_hdri == "false"', {
                'outputs': [
                  '<(module_root_dir)/deps/ImageMagick/Magick++/lib/.libs/libMagick++-7.Q16.a',
                  '<(module_root_dir)/deps/ImageMagick/MagickWand/.libs/libMagickWand-7.Q16.a',
                  '<(module_root_dir)/deps/ImageMagick/MagickCore/.libs/libMagickCore-7.Q16.a'
                ],
              }],
              ['enable_hdri == "true"', {
                'outputs': [
                  '<(module_root_dir)/deps/ImageMagick/Magick++/lib/.libs/libMagick++-7.Q16HDRI.a',
                  '<(module_root_dir)/deps/ImageMagick/MagickWand/.libs/libMagickWand-7.Q16HDRI.a',
                  '<(module_root_dir)/deps/ImageMagick/MagickCore/.libs/libMagickCore-7.Q16HDRI.a'
                ],
              }],
              ['target_platform != "wasm"', {
                'action': [ 'sh', '<(module_root_dir)/deps/build_magick.sh', '<(module_path)', '<(hdri)' ]
              }],
              ['target_platform == "wasm"', {
                'action': [ 'sh', '<(module_root_dir)/deps/build_magick_wasm.sh' ]
              }],
            ]
          }
        ],
        'direct_dependent_settings': {
          'libraries': [
            '-L<(module_root_dir)/deps/ImageMagick/Magick++/lib/.libs/',
            '-L<(module_root_dir)/deps/ImageMagick/MagickWand/.libs/',
            '-L<(module_root_dir)/deps/ImageMagick/MagickCore/.libs',
            '<@(magicklibs)'
          ],
          'conditions': [
            ['target_platform != "wasm"', {
              'libraries': [ '<!@(sh configure_magick.sh <(module_path) <(hdri))' ]
            }],
            ['target_platform == "wasm"', {
              'libraries': [ '<!@(bash configure_magick_wasm.sh <(hdri))' ]
            }]
          ]
        }
      }],
      # Windows build
      ['target_platform != "wasm" and OS == "win"', {
        'actions': [
          {
            'action_name': 'make',
            'inputs': [ '<(module_root_dir)/deps/ImageMagick-Windows/VisualMagick/VisualStaticMT.sln' ],
            'outputs': [ '<(module_root_dir)/deps/ImageMagick-Windows/VisualMagick/lib/CORE_<(winlibid)_Magick++_.lib' ],
            'action': [ '<(module_root_dir)/deps/build_magick.bat', '<(module_path)', '<(winbuildtype)' ]
          }
        ],
        'direct_dependent_settings': {
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
          'inputs': [ '<!@(configure_magick.bat > configure.log)' ]
        }
      }]
    ]
  }]
}
