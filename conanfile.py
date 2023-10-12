from conans import ConanFile, CMake

required_conan_version = ">=1.60.0"

class ImageMagickDelegates(ConanFile):
    settings = 'os', 'compiler', 'build_type', 'arch'
    print(settings)

    requires = (
      'libaom-av1/3.6.0',
      'brotli/1.0.9',
      'bzip2/1.0.8',
      'libde265/1.0.11',
      'openexr/3.1.5',
      'fftw/3.3.10',
      'freetype/2.13.0',
      'fribidi/1.0.12',
      'libheif/1.13.0',
      'jasper/4.0.0',
      'jbig/20160605',
      'libjpeg-turbo/3.0.0',
      'lcms/2.14',
      'lzma_sdk/9.20',
      'openjpeg/2.5.0',
      'pixman/0.40.0',
      'libpng/1.6.39',
      'libraw/0.21.1',
      'libtiff/4.6.0',
      'libwebp/1.3.2',
      'libxml2/2.10.4',
      'libzip/1.9.2',
      'xz_utils/5.4.4',
      'zlib/1.2.13'
    )

    default_options = {
      'jasper:with_libjpeg': 'libjpeg-turbo',
      'libtiff:jpeg': 'libjpeg-turbo',
      'libraw:with_jpeg':
      'libjpeg-turbo'
    }

    generators = 'compiler_args', 'pkg_config', 'json'

    def requirements(self):
      if self.settings.arch != 'wasm':
        # Fonts and OpenMP are not available on WASM targets
        self.requires += (
          'libffi/3.4.4',
          'fontconfig/2.14.2',
          'glib/2.78.0',
          'harfbuzz/7.1.0',
          'highway/1.0.3',
          'llvm-openmp/12.0.1'
        )

    def configure(self):
      if self.settings.arch != 'wasm':
        self.options['glib'].shared = False
        self.options['glib'].fPIC = True
      else:
        # While Emscripten supports SIMD, Node.js does not and cannot run the resulting WASM bundle
        # The performance gain is not very significant and it has a huge compatibility issue
        self.options['libwebp'].with_simd = False
