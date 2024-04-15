{
  # These are all the command-line switches and their default values
  'includes': [
    '../arguments.gypi'
  ],
  'variables': {
    # Debug builds on Windows require manually adjusting these
    'winbuildtype%': '/p:Configuration=Release,Platform=x64',
    'winlibid%': 'RL',
  },
  'conditions': [
    ['target_platform == "emscripten"', {
      # wasm enables the cross-compilation
      'includes': [
        '../conan/conan_compiler.gypi'
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
  'targets': [{
    # This is the built-in ImageMagick
    'target_name': 'imagemagick',
    # It is in fact a static_library but we do everything manually
    'type': 'none',
    'direct_dependent_settings': {
      'defines': [ '<@(magickdefines)' ]
    },
    'includes': [
      '../conan/conan_compile_settings.gypi',
      '../conan/conan_link_settings.gypi'
    ],
    'conditions': [
      # Linux / macOS / WASM build
      # (the WASM build is very similar to a POSIX build)
      ['target_platform == "emscripten" or OS == "linux" or OS =="mac"', {
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
              ['target_platform != "emscripten"', {
                'action': [ 'sh', '<(module_root_dir)/deps/build_magick.sh', '<(module_path)', '<(hdri)' ]
              }],
              ['target_platform == "emscripten"', {
                'action': [ 'bash', '<(module_root_dir)/deps/build_magick_wasm.sh', '<(module_path)', '<(hdri)' ]
              }],
            ]
          }
        ],
        'direct_dependent_settings': {
          'include_dirs': [
            '<(module_root_dir)/deps/ImageMagick/Magick++/lib',
            '<(module_root_dir)/deps/ImageMagick'
          ],
          'libraries': [
            '-L<(module_root_dir)/deps/ImageMagick/Magick++/lib/.libs/',
            '-L<(module_root_dir)/deps/ImageMagick/MagickWand/.libs/',
            '-L<(module_root_dir)/deps/ImageMagick/MagickCore/.libs',
            '<@(magicklibs)'
          ],
          'conditions': [
            ['target_platform != "emscripten"', {
              'libraries': [ '<!@(bash configure_magick.sh <(module_path) <(hdri) <(display))' ]
            }],
            ['target_platform == "emscripten"', {
              'libraries': [ '<!@(bash configure_magick_wasm.sh <(module_path) <(hdri))' ]
            }]
          ]
        },
        'link_settings': {
          'includes': [ '../conan/conan_link_settings.gypi' ]
        }
      }],
      # Windows build
      ['target_platform != "emscripten" and OS == "win"', {
        'variables': {
          'magick_win_lib': '<(module_root_dir)/deps/ImageMagick-Windows/Output/lib'
        },
        'actions': [
          {
            'action_name': 'make',
            'inputs': [ '<(module_root_dir)/deps/ImageMagick-Windows/IM7.Static.sln' ],
            'outputs': [ '<(module_root_dir)/deps/ImageMagick-Windows/VisualMagick/lib/CORE_<(winlibid)_Magick++_.lib' ],
            'action': [ '<(module_root_dir)/deps/build_magick.bat', '<(module_path)', '<(winbuildtype)' ]
          }
        ],
        'direct_dependent_settings': {
          'include_dirs': [
            '<(module_root_dir)/deps/ImageMagick-Windows/ImageMagick/Magick++/lib',
            '<(module_root_dir)/deps/ImageMagick-Windows/ImageMagick'
          ],
          'libraries': [
            '<(magick_win_lib)/CORE_<(winlibid)_aom_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_brotli_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_bzlib_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_cairo_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_coders_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_croco_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_de265_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_deflate_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_exr_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_ffi_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_filters_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_freetype_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_fribidi_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_glib_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_harfbuzz_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_heif_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_highway_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_jasper_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_jpeg-turbo_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_jpeg-xl_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_lcms_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_lqr_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_lzma_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_Magick++_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_MagickCore_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_MagickWand_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_openjpeg_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_pango_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_pixman_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_png_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_raqm_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_raw_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_rsvg_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_tiff_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_webp_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_xml_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_zip_.lib',
            '<(magick_win_lib)/CORE_<(winlibid)_zlib_.lib'
          ],
          'inputs': [ '<!@(configure_magick.bat > ../build/magick_configure.log)' ]
        }
      }]
    ]
  }]
}
