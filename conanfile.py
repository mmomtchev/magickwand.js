from conan import ConanFile
from conan.tools.files import save
from conan.tools import CppInfo
from os import environ


required_conan_version = ">=2.0.0"

def npm_option(option, default):
    npm_opt = f'npm_config_{option}'
    if not npm_opt in environ:
      return default
    if environ[npm_opt] == '' or environ[npm_opt].lower() == 'false':
      return False
    if environ[npm_opt].lower() == 'true':
      return True
    return environ[npm_opt]


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
      'color': [ True, False ],
      'xml': [ True, False ],
      'gzip': [ True, False ],
      'zip': [ True, False ],
      'bzip2': [ True, False ],
      'zstd': [ True, False ],
      'xz': [ True, False ],
      'lzma': [ True, False ],
      'cairo': [ True, False ],
      'simd': [ True, False ],
      'openmp': [ True, False ],
      'display': [ True, False ]
    }

    default_options = {
      'fonts':      npm_option('fonts', True),
      'jpeg':       npm_option('jpeg', True),
      'png':        npm_option('png', True),
      'tiff':       npm_option('tiff', True),
      'webp':       npm_option('webp', True),
      'jpeg2000':   npm_option('jpeg2000', True),
      'raw':        npm_option('raw', True),
      'openmedia':  npm_option('openmedia', True),
      'brotli':     npm_option('brotli', True),
      'h265':       npm_option('h265', True),
      'exr':        npm_option('exr', True),
      'fftw':       npm_option('fftw', False),
      'heif':       npm_option('heif', True),
      'jbig':       npm_option('jbig', True),
      'color':      npm_option('color', True),
      'xml':        npm_option('xml', True),
      'gzip':       npm_option('gzip', True),
      'zip':        npm_option('zip', True),
      'bzip2':      npm_option('bzip2', True),
      'zstd':       npm_option('zstd', True),
      'xz':         npm_option('xz', True),
      'lzma':       npm_option('lzma', True),
      'cairo':      npm_option('cairo', True),
      'simd':       npm_option('simd', True),
      'openmp':     npm_option('openmp', True),
      'display':    npm_option('display', True)
    }

    generators = [ 'MesonToolchain', 'CMakeDeps', 'CMakeToolchain' ]

    def requirements(self):
      # Fonts are not available on WASM targets
      if self.options.fonts and self.settings.arch != 'wasm':
        [self.requires(x, force=True) for x in (
          'libffi/3.4.4', 'freetype/2.13.2', 'fribidi/1.0.12', 'glib/2.78.1', 'harfbuzz/8.3.0'
        )]
        if self.settings.os != 'Windows':
          self.requires('fontconfig/2.14.2', force=True)

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
        self.requires('brotli/1.1.0')

      if self.options.xz:
        self.requires('xz_utils/5.4.5')

      if self.options.gzip:
        self.requires('zlib/1.2.13')

      if self.options.fftw:
        self.requires('fftw/3.3.10')

      if self.options.color:
        self.requires('lcms/2.14')

      if self.options.xml:
        self.requires('libxml2/2.10.4')

      if self.options.openmedia:
        self.requires('libaom-av1/3.6.0')

      if self.options.h265:
        self.requires('libde265/1.0.12')

      if self.options.heif:
        self.requires('libheif/1.13.0')

      if self.options.jbig:
        self.requires('jbig/20160605')

      if self.options.exr:
        self.requires('openexr/3.1.5')

      if self.options.png:
        self.requires('libpng/1.6.42')

      if self.options.webp:
        self.requires('libwebp/1.3.2')

      if self.options.jpeg2000 or self.options.tiff or self.options.raw:
        self.requires('libjpeg-turbo/3.0.2', force=True)

      if self.options.jpeg2000:
        self.requires('jasper/4.2.0', force=True)

      if self.options.tiff:
        self.requires('libtiff/4.6.0')

      if self.options.raw:
        self.requires('libraw/0.21.2')

      if self.options.jpeg:
        self.requires('openjpeg/2.5.0')

      if self.options.cairo and self.settings.arch != 'wasm':
        self.requires('cairo/1.17.8', force=True)
        self.requires('expat/2.6.0', force=True)

      if self.options.simd and self.settings.arch != 'wasm':
        self.requires('highway/1.0.3')

      if self.options.openmp and self.settings.arch != 'wasm' and self.settings.os != 'Windows':
        self.requires('llvm-openmp/12.0.1')

      if self.options.display and self.settings.arch != 'wasm':
        self.requires('pixman/0.43.4', force=True)

    def configure(self):
      if self.settings.arch != 'wasm' and self.options.fonts:
        self.options['glib'].shared = False
        self.options['glib'].fPIC = True

      if self.options.jpeg2000:
        self.options['jasper'].with_libjpeg = 'libjpeg-turbo'
      
      if self.options.tiff:
        self.options['libtiff'].jpeg = 'libjpeg-turbo'

      if self.options.raw:
        self.options['libraw'].with_jpeg = 'libjpeg-turbo'

      fonts_enabled = self.settings.arch != 'wasm' and self.options.fonts
      if self.options.cairo and self.settings.arch != 'wasm':
        self.options['cairo'].with_png = self.options.png
        self.options['cairo'].with_glib = fonts_enabled
        # There is no portable way to include xlib
        self.options['cairo'].with_xlib = False
        self.options['cairo'].with_xlib_xrender = False
        self.options['cairo'].with_xcb = False
        self.options['cairo'].with_xcb = False
        self.options['cairo'].with_zlib = self.options.gzip
        self.options['cairo'].with_freetype = fonts_enabled
        self.options['cairo'].with_fontconfig = fonts_enabled and self.settings.os != 'Windows'

      # While Emscripten supports SIMD, Node.js does not and cannot run the resulting WASM bundle
      # The performance gain is not very significant and it has a huge compatibility issue
      if self.options.webp and (self.settings.arch == 'wasm' or not self.options.simd):
        self.options['libwebp'].with_simd = False
      
      # When building with emscripten, the main exe is called zstd.js and all symlinks are broken
      if self.settings.arch == 'wasm' and self.options.zstd:
        self.options['zstd'].build_programs = False
