# --------------------
# Project files
# --------------------
project(
  'JavaScript bindings for ImageMagick-7',
  ['c', 'cpp'],
  default_options: ['buildtype=release', 'cpp_std=c++17'],
  subproject_dir: 'deps',
)
module_name = 'magickwand'

sources = run_command(
  'node',
  '-p', 'fs.readdirSync("@0@").filter(x => x.match(/cxx$/)).map((x) => `swig/${x}`).join(",")'.format(meson.global_source_root() / 'swig'),
  check: true,
).stdout().strip().split(',')

dependencies = []
root_dir = meson.global_source_root()
static = not get_option('shared') and not meson.is_cross_build()
external = get_option('external')

if not external
  cmake_dependencies = [{'project': 'ImageMagick', 'target': 'Magick++-7.Q16HDRI'}]
  cmake_options = [
    {'MAGICKCORE_QUANTUM_DEPTH': '16'},
    {'MAGICK_BUILD_STATIC': static},
    {'MAGICK_HDRI_ENABLE': true},
    {'INSTALLED_SUPPORT': false},
    {'BUILD_UTILITIES': not meson.is_cross_build()},
  ]
else
  cmake_dependencies = []
  cmake_options = []
endif

if meson.get_compiler('cpp').get_id() == 'emscripten'
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

# --------------------
# conan + meson + CMake integration
# (ie make CMake use the conan-provided libraries - the
# other important part is in hadron/conan.ini)
# --------------------
cmake = import('cmake')
cmake_opts = cmake.subproject_options()
cmake_opts.add_cmake_defines(
  [
    {'CMAKE_FIND_LIBRARY_SUFFIXES': '.a'},
    {'BUILD_SHARED_LIBS': not static},
    {'CMAKE_POSITION_INDEPENDENT_CODE': true},
  ],
)
cmake_opts.add_cmake_defines(cmake_options)

foreach cmake_dep : cmake_dependencies
  project = cmake.subproject(cmake_dep.get('project'), options: cmake_opts)
  dep = project.dependency(cmake_dep.get('target'))
  dependencies += [dep]
endforeach

# --------------------
# Build the module
# --------------------
napi = import('node-api')
main_target = napi.extension_module(
  module_name,
  sources,
  install: true,
  dependencies: dependencies,
  node_api_options: {'swig': true},
)

summary(
  {
    'link with external ImageMagick': external,
    'build ImageMagick statically': static and not external,
    'build CLI tool': not meson.is_cross_build() and not external,
  },
)
