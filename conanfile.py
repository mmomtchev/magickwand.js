from conans import ConanFile, CMake

required_conan_version = ">=1.60.0"

class ImageMagickDelegates(ConanFile):
    settings = 'os', 'compiler', 'build_type', 'arch'

    options = {
      'fonts': [ True, False ],
      'jpeg': [ True, False ],
      'png': [ True, False ],
      'tiff': [ True, False ],
      'webp': [ True, False ],
      'jpeg2000': [ True, False ],
      'raw': [ True, False ],
      'openmedia': [ True, False ],
      'brotli': [ True, False ],
      'h265': [ True, False ],
      'exr': [ True, False ],
      'fftw': [ True, False ],
      'heif': [ True, False ],
      'jbig': [ True, False ],
      'cms': [ True, False ],
      'xml': [ True, False ],
      'gzip': [ True, False ],
      'zip': [ True, False ],
      'bzip2': [ True, False ],
      'zstd': [ True, False ],
      'xz': [ True, False ],
      'lzma': [ True, False ],
      'simd': [ True, False ],
      'openmp': [ True, False ],
      'display': [ True, False ]
    }

    default_options = {
      'fonts': True,
      'jpeg': True,
      'png': True,
      'tiff': True,
      'webp': True,
      'jpeg2000': True,
      'raw': True,
      'openmedia': True,
      'brotli': True,
      'h265': True,
      'exr': True,
      'fftw': True,
      'heif': True,
      'jbig': True,
      'cms': True,
      'xml': True,
      'gzip':True,
      'zip': True,
      'bzip2': True,
      'zstd': True,
      'xz': True,
      'lzma': True,
      'simd': True,
      'openmp': True,
      'display': True
    }

    generators = 'pkg_config', 'json'

    def requirements(self):
      # Fonts are not available on WASM targets
      if self.options.fonts and self.settings.arch != 'wasm':
        [self.requires(x) for x in ('libffi/3.4.4', 'fontconfig/2.14.2', 'freetype/2.13.0', 'fribidi/1.0.12', 'glib/2.78.0', 'harfbuzz/7.1.0')]

      # LZMA is blocked by https://github.com/conan-io/conan-center-index/issues/20602
      if self.options.lzma and self.settings.arch != 'wasm':
        self.requires('lzma_sdk/9.20')

      if self.options.bzip2:
        self.requires('bzip2/1.0.8')

      if self.options.zstd:
        self.requires('zstd/1.5.5')

      if self.options.zip:
        self.requires('libzip/1.9.2')

      if self.options.brotli:
        self.requires('brotli/1.0.9')

      if self.options.xz:
        self.requires('xz_utils/5.4.4')

      if self.options.gzip:
        self.requires('zlib/1.2.13')

      if self.options.fftw:
        self.requires('fftw/3.3.10')

      if self.options.cms:
        self.requires('lcms/2.14')

      if self.options.xml:
        self.requires('libxml2/2.10.4')

      if self.options.openmedia:
        self.requires('libaom-av1/3.6.0')

      if self.options.h265:
        self.requires('libde265/1.0.11')

      if self.options.heif:
        self.requires('libheif/1.13.0')

      if self.options.jbig:
        self.requires('jbig/20160605')

      if self.options.exr:
        self.requires('openexr/3.1.5')

      if self.options.png:
        self.requires('libpng/1.6.39')

      if self.options.webp:
        self.requires('libwebp/1.3.2')

      if self.options.jpeg2000:
        [self.requires(x) for x in ('jasper/4.0.0', 'libjpeg-turbo/3.0.0')]
        self.options['libtiff'].jpeg = 'libjpeg-turbo'

      if self.options.tiff:
        [self.requires(x) for x in ('libtiff/4.6.0', 'libjpeg-turbo/3.0.0')]
        self.options['libtiff'].jpeg = 'libjpeg-turbo'

      if self.options.raw:
        [self.requires(x) for x in ('libraw/0.21.1', 'libjpeg-turbo/3.0.0')]
        self.options['libraw'].with_jpeg = 'libjpeg-turbo'

      if self.options.jpeg:
        [self.requires(x) for x in ('openjpeg/2.5.0', 'libjpeg-turbo/3.0.0')]
        self.options['jasper'].with_libjpeg = 'libjpeg-turbo'

      if self.options.simd and self.settings.arch != 'wasm':
        self.requires('highway/1.0.3')

      if self.options.openmp and self.settings.arch != 'wasm':
        self.requires('llvm-openmp/12.0.1')

      if self.options.display and self.settings.arch != 'wasm':
        self.requires('pixman/0.40.0')

    def configure(self):
      if self.settings.arch != 'wasm' and self.options.fonts:
        self.options['glib'].shared = False
        self.options['glib'].fPIC = True

      # While Emscripten supports SIMD, Node.js does not and cannot run the resulting WASM bundle
      # The performance gain is not very significant and it has a huge compatibility issue
      if self.options.webp and (self.settings.arch == 'wasm' or not self.options.simd):
        self.options['libwebp'].with_simd = False
      
      # When building with emscripten, the main exe is called zstd.js and all symlinks are broken
      if self.settings.arch == 'wasm' and self.options.zstd:
        self.options['zstd'].build_programs = False
