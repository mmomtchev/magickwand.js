# --------------------
# Project files
# --------------------
project(
  'JavaScript bindings for ImageMagick-7',
  ['c', 'cpp'],
  default_options: ['buildtype=release', 'cpp_std=c++17'],
  version: run_command('node', '-p', 'require("./package.json").version', check: true).stdout().strip(),
  subproject_dir: 'deps',
)
module_name = 'magickwand'

sources_raw = run_command(
  'node',
  '-p',
  'fs.readdirSync("@0@").filter(x => x.match(/cxx$/)).map((x) => `swig/${x}`).join(",")'.
    format(meson.global_source_root() / 'swig'),
  check: true,
)
sources = sources_raw.stdout().strip().split(',')

dependencies = []

# We need the Node.js arch name, not the Python one
arch = run_command('node', '-p', '`${os.platform()}-${os.arch()}`', check: true).stdout().strip()
if meson.is_cross_build()
  if meson.get_compiler('cpp').get_id() == 'emscripten'
    arch = 'emscripten-' + target_machine.cpu_family()
  else
    error('Only emscripten-wasm32 cross-compilation is supported at the moment')
  endif
endif
root_dir = meson.global_source_root()
lib_dir = root_dir / 'lib'
install_dir = lib_dir / 'binding' / arch

cmake_dependencies = [
  {'project': 'ImageMagick', 'target': 'Magick++-7.Q16HDRI'}
]
cmake_options = [
  {'MAGICKCORE_QUANTUM_DEPTH': '16'},
  {'MAGICK_BUILD_STATIC': true},
  {'MAGICK_HDRI_ENABLE': true},
  {'INSTALLED_SUPPORT': false},
  {'BUILD_UTILITIES': not meson.is_cross_build()},
]

# ====================
# Everything below this point is the SWIG+Node-API+emnapi system build
# ====================

# --------------------
# SWIG compiler options
# --------------------
shared_cpp_args = [
  '-Wno-deprecated-declarations',
  '-Wno-unused-function',
  '-Wno-type-limits',
  '-Wno-deprecated-copy',
  '-Wno-attributes'
]
gcc_cpp_args = shared_cpp_args + [ '-Wno-maybe-uninitialized' ]
clang_cpp_args = shared_cpp_args + [
    '-Wno-sometimes-uninitialized',
    '-Wpotentially-evaluated-expression',
    '-Wundefined-inline',
  ]
msvc_cpp_args = ['/wo6246', '/wo28182', '/Zc:__cplusplus', '/bigobj']

async = true

name_suffix = 'node'
if meson.get_compiler('cpp').get_id() == 'clang'
  add_project_arguments(clang_cpp_args, language: 'cpp')
  if host_machine.system() == 'windows'
    add_project_arguments(['-fms-extensions'], language: 'cpp')
  endif
endif
if meson.get_compiler('cpp').get_id() == 'gcc'
  add_project_arguments(gcc_cpp_args, language: 'cpp')
endif
if meson.get_compiler('cpp').get_id() == 'msvc'
  add_project_arguments(msvc_cpp_args, language: 'cpp')
endif
if meson.get_compiler('cpp').get_id() == 'emscripten'
  add_project_arguments(clang_cpp_args, language: 'cpp')
  add_global_arguments(['-sNO_DISABLE_EXCEPTION_CATCHING'], language: 'cpp')
  add_global_arguments(['-D__STDC_FORMAT_MACROS'], language: ['c', 'cpp'])
  name_suffix = 'mjs'
endif

# --------------------
# emnapi
# --------------------
includes = []
extra_output_files = []
if meson.get_compiler('cpp').get_id() == 'emscripten'
  extra_output_files += [module_name + '.wasm']

  if async
    async_opts = ['-pthread', '-DEMNAPI_WORKER_POOL_SIZE=4']
    add_global_arguments(async_opts, language: ['c', 'cpp'])
    add_global_link_arguments(async_opts, language: ['c', 'cpp'])
    extra_output_files += [module_name + '.worker.mjs']
    add_project_arguments(['-DASYNC=1'], language: ['c', 'cpp'])
  else
    add_project_arguments(['-DNO_ASYNC=1'], language: ['c', 'cpp'])
  endif
  add_global_link_arguments(
    [
      '-sDEFAULT_PTHREAD_STACK_SIZE=1MB',
      '-sPTHREAD_POOL_SIZE=4',
      '-Wno-emcc',
      '-Wno-pthreads-mem-growth',
      '-sALLOW_MEMORY_GROWTH=1',
      '-sEXPORTED_FUNCTIONS=["_napi_register_wasm_v1","_malloc","_free"]',
      '-sEXPORTED_RUNTIME_METHODS=["FS"]',
      #'-sINCOMING_MODULE_JS_API=["wasmMemory","buffer"]',
      '-sNO_DISABLE_EXCEPTION_CATCHING',
      '--bind',
      '-sMODULARIZE',
      '-sEXPORT_ES6=1',
      '-sEXPORT_NAME=' + module_name,
      # Pay attention to this value, if you overflow it, you will get
      # all kinds of weird errors
      '-sSTACK_SIZE=1MB',
      # This should probably be optional
      '-sENVIRONMENT=web,webview,worker',
      # This one is used for unit testing, it is only 4Kb
      f'--embed-file=@root_dir@/test/data/wizard.gif@wizard.gif',
      # These are needed by ImageMagick
      f'--embed-file=@root_dir@/deps/ImageMagick/config/policy-open.xml@policy.xml',
      f'--embed-file=@root_dir@/deps/ImageMagick/config/colors.xml@colors.xml',
      f'--embed-file=@root_dir@/deps/ImageMagick/config//log.xml@log.xml',
      f'--embed-file=@root_dir@/deps/ImageMagick/config/locale.xml@locale.xml',
      f'--embed-file=@root_dir@/deps/ImageMagick/config/english.xml@english.xml'
    ],
    language: ['c', 'cpp'],
  )

  if get_option('debug')
    add_global_arguments(['-gsource-map'], language: 'cpp')
    add_global_link_arguments(
      [
        '-gsource-map',
        '-sSAFE_HEAP=1',
        '-sASSERTIONS=2',
        '-sSTACK_OVERFLOW_CHECK=2',
      ],
      language: ['c', 'cpp'],
    )
  endif

  includes += run_command(
    'node',
    '-p',
    'require("emnapi").include_dir',
    check: true,
  ).stdout().strip()
  sources += run_command(
    'node',
    '-p',
    'require("emnapi").sources.map(x => path.relative(process.cwd(), x)).join(",")',
    check: true,
  ).stdout().strip().split(',')
  emnapi_js_lib = run_command(
    'node',
    '-p',
    'require("emnapi").js_library',
    check: true,
  ).stdout().strip()
  add_global_link_arguments(
    '--js-library=' + emnapi_js_lib,
    language: ['c', 'cpp'],
  )
endif

# --------------------
# Node-API
# --------------------
includes += run_command(
  'node',
  '-p',
  'require("node-addon-api").include_dir',
  check: true,
).stdout().strip()
includes += include_directories(meson.get_external_property('node_api_include'))
add_global_link_arguments(
  meson.get_external_property('node_lib', []),
  language: ['c', 'cpp'],
)

# --------------------
# conan + meson + CMake integration
# (ie make CMake use the conan-provided libraries)
# --------------------
cmake = import('cmake')
cmake_opts = cmake.subproject_options()
#cmake_opts.add_cmake_defines(
#  [
#    {'CMAKE_FIND_LIBRARY_SUFFIXES': '.a'},
#    {'BUILD_SHARED_LIBS': false},
#    {'CMAKE_POSITION_INDEPENDENT_CODE': true},
#  ],
#)
cmake_opts.add_cmake_defines(cmake_options)

foreach cmake_dep : cmake_dependencies
  project = cmake.subproject(cmake_dep.get('project'), options: cmake_opts)
  message('CMake targets:\n - ' + '\n - '.join(project.target_list()))
  dep = project.dependency(cmake_dep.get('target'))
  message('CMake tll: ', dep.name())
  dependencies += [dep]
endforeach

#err()
# --------------------
# Build the module
# --------------------
main_target = shared_module(
  module_name,
  sources,
  include_directories: [includes],
  name_prefix: '',
  name_suffix: name_suffix,
  install: true,
  install_dir: install_dir,
  dependencies: dependencies,
)

# --------------------
# Install the extra files produced by the build (emscripten)
# --------------------
if extra_output_files.length() > 0
  custom_target(
    'extra_files',
    command: ['node', '-e', ''],
    depends: main_target,
    input: main_target,
    output: [extra_output_files],
    install: true,
    install_dir: install_dir,
  )
endif
