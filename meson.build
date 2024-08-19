# --------------------
# Project files
# --------------------
project(
  'JavaScript bindings for ImageMagick-7',
  ['c', 'cpp'],
  default_options: [
    'buildtype=release',
    'cpp_std=c++17',
    # Avoid the infamous Windows DLL hell
    # Here is an example horror story: https://github.com/actions/runner-images/issues/10020
    # (Node.js and node-gyp hide this from you by linking the runtime statically by default)
    'b_vscrt=static_from_buildtype'
  ],
  subproject_dir: 'deps',
  meson_version: '>=1.5.0'
)
napi = import('node-api')

root_dir = meson.global_source_root()
static = not get_option('shared') or meson.is_cross_build()
prefer_static = get_option('prefer_static')
external = get_option('external')

# Show a summary
summary(
  {
    'link with external ImageMagick': external,
    'build ImageMagick statically': static and not external,
    'build CLI tool': not meson.is_cross_build() and not external,
  },
  section: 'Build options',
)

# The SWIG-generated bindings
sources = run_command(
  'node',
  '-p', 'fs.readdirSync("@0@").filter(x => x.match(/cxx$/)).map((x) => `swig/${x}`).join(",")'.format(meson.global_source_root() / 'swig'),
  check: true,
).stdout().strip().split(',')

if meson.get_compiler('cpp').get_id() == 'emscripten'
  if external
    error('Rebuilding the WASM module with an externally provided ImageMagick library is not possible')
  endif
  # Embed these files into the WASM bundle
  add_global_link_arguments(
    [
      # This one is used for unit testing, it is only 4Kb
      f'--embed-file=@root_dir@/test/data/wizard.gif@wizard.gif',
      # These are needed by ImageMagick
      f'--embed-file=@root_dir@/deps/ImageMagick/config/policy-open.xml@policy.xml',
      f'--embed-file=@root_dir@/deps/ImageMagick/config/colors.xml@colors.xml',
      f'--embed-file=@root_dir@/deps/ImageMagick/config//log.xml@log.xml',
      f'--embed-file=@root_dir@/deps/ImageMagick/config/locale.xml@locale.xml',
      f'--embed-file=@root_dir@/deps/ImageMagick/config/english.xml@english.xml',
    ],
    language: ['c', 'cpp'],
  )
endif

if meson.get_compiler('cpp').get_id() == 'msvc'
  add_global_arguments([
      # The SWIG-generated wrapper for Magick++::Image is huge
      # and requires compiling with /bigobj on Windows
      '/bigobj',
    ], language: 'cpp')
endif

dependencies = []

if not external
# --------------------
# ImageMagick
# --------------------
# conan + meson + CMake integration
# (ie make CMake use the conan-provided libraries - the
# other important part is in hadron/conan.ini)
# --------------------
  cmake = import('cmake')
  cmake_opts = cmake.subproject_options()
  cmake_opts.add_cmake_defines([
    # These are the ImageMagick build options as supported
    # by the ImageMagick CMake build system
    {'MAGICKCORE_QUANTUM_DEPTH': '16'},
    {'BUILD_SHARED_LIBS': not static},
    {'MAGICK_HDRI_ENABLE': true},
    {'INSTALLED_SUPPORT': false},
    {'BUILD_UTILITIES': not meson.is_cross_build()},
    # This is required since we are building ImageMagick as a static library to be
    # included in a dynamically loadable module
    {'CMAKE_POSITION_INDEPENDENT_CODE': true}
  ])

  if prefer_static
    # Used for the prebuilt binaries, links X11 statically
    # This allows to use them even if X11 is not installed
    cmake_opts.add_cmake_defines([{'MAGICK_PREFER_STATIC_LIBS': true}])
  endif

  # ImageMagick optional modules
  im_opts = {
    'fonts':    [ 'FONTCONFIG_DELEGATE', 'FREETYPE_DELEGATE' ],
    'jpeg':     [ 'JPEG_DELEGATE' ],
    'png':      [ 'PNG_DELEGATE' ],
    'tiff':     [ 'TIFF_DELEGATE' ],
    'webp':     [ 'WEBP_DELEGATE', 'WEBPMUX_DELEGATE', 'WEBPDEMUX_DELEGATE' ],
    'jpeg2000': [ 'LIBOPENJP2_DELEGATE' ],
    'jbig':     [ 'JBIG_DELEGATE' ],
    'raw':      [ 'RAW_R_DELEGATE' ],
    'exr':      [ 'OPENEXR_DELEGATE' ],
    'heif':     [ 'HEIC_DELEGATE' ],
    'color':    [ 'LCMS_DELEGATE' ],
    'xml':      [ 'XML_DELEGATE' ],
    'gzip':     [ 'ZLIB_DELEGATE' ],
    'zip':      [ 'ZIP_DELEGATE' ],
    'bzip2':    [ 'BZLIB_DELEGATE' ],
    'zstd':     [ 'ZSTD_DELEGATE' ],
    'lzma':     [ 'LZMA_DELEGATE' ],
    'openmp':   [ 'OPENMP_SUPPORT' ],
    'display':  [ 'X11_DELEGATE' ],
    'cairo':    [ 'CAIRO_DELEGATE' ],
    'fftw':     [ 'FFTW_DELEGATE' ],
    'jxl':      [ 'JXL_DELEGATE', 'BROTLI_DELEGATE' ],
  }

  # Parse the options and enable the macros that disable/enable certain delegates
  # A delegate that is enabled is a delegate that will be autoconfigured _if it is found_
  foreach opt, defines : im_opts
    if not get_option(opt)
      foreach d : defines
        cmake_opts.add_cmake_defines([{d: false}])
      endforeach
    endif
    summary(opt, get_option(opt), section: 'Enabled delegates')
  endforeach

  # ImageMagick supports fontconfig on Windows (and the Github Actions runners carry it)
  # but this support is far from perfect and it is not needed
  if host_machine.system() == 'windows'
    cmake_opts.add_cmake_defines([{'FONTCONFIG_DELEGATE': false}])
  endif

  imagemagick = cmake.subproject('ImageMagick', options: cmake_opts)
  magickpp = imagemagick.dependency('Magick++-7.Q16HDRI')
  dependencies += [magickpp]
endif

thread_dep = dependency('threads')
dependencies += [thread_dep]

# When building ImageMagick as a shared library, it goes in lib
if not static
  if host_machine.system() == 'linux'
    rpath = '$ORIGIN/lib'
  elif host_machine.system() == 'darwin'
    rpath = '@loader_path/lib'
  else
    warning('When using dynamic linking on ' + host_machine.system() + ' you must set the PATH yourself')
  endif
else
  rpath = ''
endif

# --------------------
# Build the module
# --------------------
main_target = napi.extension_module(
  'magickwand',
  sources,
  install: true,
  dependencies: dependencies,
  install_rpath: rpath,
  node_api_options: {
    'swig': true,
    # Node.js is excluded from the WASM loader on purpose:
    # * it has its own native build that is much better than WASM
    # * and including it produces a loader that confuses web bundlers such as Webpack
    'environments': ['web','webview','worker'],
    # Export the FS subsystem
    'exported_runtime_methods': ['emnapiInit', 'FS']
  }
)
