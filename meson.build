# --------------------
# Project files
# --------------------
project(
  'JavaScript bindings for ImageMagick-7',
  ['c', 'cpp'],
  default_options: ['buildtype=release', 'cpp_std=c++17'],
  subproject_dir: 'deps',
)

root_dir = meson.global_source_root()
static = not get_option('shared') or meson.is_cross_build()
external = get_option('external')

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
      # Export the FS subsystem
      '-sEXPORTED_RUNTIME_METHODS=["FS"]',
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

# The SWIG-generated wrapper for Magick++::Image is huge
# and requires compiling with /bigobj on Windows
if meson.get_compiler('cpp').get_id() == 'msvc'
  add_global_arguments('/bigobj', language: 'cpp')
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
  cmake_opts.add_cmake_defines(
    [
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
    ]
  )
  # ImageMagick supports fontconfig on Windows (and the Github Actions runners carry it)
  # but this support is far from perfect and it is totally useless
  if host_machine.system() == 'windows'
    cmake_opts.add_cmake_defines([{'FONTCONFIG_DELEGATE': false}])
  endif
  imagemagick = cmake.subproject('ImageMagick', options: cmake_opts)
  magickpp = imagemagick.dependency('Magick++-7.Q16HDRI')
  dependencies += [magickpp]
endif

thread_dep = dependency('threads')
dependencies += [thread_dep]

# --------------------
# Build the module
# --------------------
napi = import('node-api')
main_target = napi.extension_module(
  'magickwand',
  sources,
  install: true,
  dependencies: dependencies,
  node_api_options: {
    'swig': true,
    'environments': ['web','webview','worker']
    },
)

summary(
  {
    'link with external ImageMagick': external,
    'build ImageMagick statically': static and not external,
    'build CLI tool': not meson.is_cross_build() and not external,
  },
)
