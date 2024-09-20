from conan import ConanFile
from conan.tools.files import save
from conan.tools import CppInfo
from conan.tools.cmake import CMakeToolchain, CMakeDeps
from conan.tools.meson import MesonToolchain
from os import environ
from io import StringIO

required_conan_version = ">=2.7.0"

def npm_option(option, default):
    npm_enable_opt = f'npm_config_enable_{option}'
    npm_disable_opt = f'npm_config_disable_{option}'
    if npm_disable_opt in environ:
      return False
    if npm_enable_opt in environ:
      return True
    return default

class ImageMagickDelegates(ConanFile):
    settings = 'os', 'compiler', 'build_type', 'arch'

    fonts_enabled = False
    clang_windows = False
    glib_available = False

    options = {
      'conan':     [ True, False ],
      'fonts':     [ True, False ],
      'jpeg':      [ True, False ],
      'png':       [ True, False ],
      'tiff':      [ True, False ],
      'webp':      [ True, False ],
      'jpeg2000':  [ True, False ],
      'jxl':       [ True, False ],
      'raw':       [ True, False ],
      'exr':       [ True, False ],
      'fftw':      [ True, False ],
      'heif':      [ True, False ],
      'jbig':      [ True, False ],
      'color':     [ True, False ],
      'xml':       [ True, False ],
      'gzip':      [ True, False ],
      'zip':       [ True, False ],
      'bzip2':     [ True, False ],
      'zstd':      [ True, False ],
      'lzma':      [ True, False ],
      'cairo':     [ True, False ],
      'simd':      [ True, False ],
      'openmp':    [ True, False ],
      'display':   [ True, False ]
    }

    default_options = {
      'conan':      npm_option('conan', False),
      'fonts':      npm_option('fonts', True) and npm_option('fonts-conan', True),
      'jpeg':       npm_option('jpeg', True) and npm_option('jpeg-conan', True),
      'png':        npm_option('png', True) and npm_option('png-conan', True),
      'tiff':       npm_option('tiff', True) and npm_option('tiff-conan', True),
      'webp':       npm_option('webp', True) and npm_option('webp-conan', True),
      'jpeg':       npm_option('jpeg', True) and npm_option('jpeg-conan', True),
      'jpeg2000':   npm_option('jpeg2000', True) and npm_option('jpeg2000-conan', True),
      'jxl':        npm_option('jxl', False) and npm_option('jxl-conan', True),
      'raw':        npm_option('raw', True) and npm_option('raw-conan', True),
      'exr':        npm_option('exr', True) and npm_option('exr-conan', True),
      'fftw':       npm_option('fftw', False) and npm_option('fftw-conan', True),
      'heif':       npm_option('heif', True) and npm_option('heif-conan', True),
      'jbig':       npm_option('jbig', True) and npm_option('jbig-conan', True),
      'color':      npm_option('color', True) and npm_option('color-conan', True),
      'xml':        npm_option('xml', True) and npm_option('xml-conan', True),
      'gzip':       npm_option('gzip', True) and npm_option('gzip-conan', True),
      'zip':        npm_option('zip', True) and npm_option('zip-conan', True),
      'bzip2':      npm_option('bzip2', True) and npm_option('bzip2-conan', True),
      'zstd':       npm_option('zstd', True) and npm_option('zstd-conan', True),
      'lzma':       npm_option('lzma', True) and npm_option('lzma-conan', True),
      'cairo':      npm_option('cairo', True) and npm_option('cairo-conan', True),
      'openmp':     npm_option('openmp', True) and npm_option('openmp-conan', True),
      'display':    npm_option('display', True) and npm_option('display-conan', True),
      'simd':       npm_option('simd', True)
    }

    # CMakeToolchain is manually instantiated at the end
    # (this should probably go into a hadron-specific conan library)
    generators = [ 'MesonToolchain', 'CMakeDeps' ]

    def requirements(self):
      # Disable all bundled delegates
      if not self.options.conan or npm_option('external', False):
        return

      if self.fonts_enabled:
        if self.glib_available:
          [self.requires(x, force=True) for x in ('libffi/3.4.4', 'glib/2.81.0')]
        [self.requires(x, force=True) for x in ('freetype/2.13.2', 'fribidi/1.0.12', 'harfbuzz/8.3.0')]
        if self.settings.os != 'Windows':
          self.requires('fontconfig/2.14.2', force=True)

      if self.options.lzma:
        self.requires('xz_utils/5.4.5')

      if self.options.bzip2:
        self.requires('bzip2/1.0.8')

      if self.options.zstd:
        self.requires('zstd/1.5.6', force=True)

      if self.options.zip:
        self.requires('libzip/1.10.1')

      if self.options.gzip:
        self.requires('zlib/1.3.1', force=True)

      if self.options.fftw:
        self.requires('fftw/3.3.10')

      # requires a Windows resource compiler
      if self.options.color and not self.clang_windows:
        self.requires('lcms/2.14')

      # libiconv/libxml use MSYS2 and are not compatible
      # with a clang compiled without MSYS2 (Cygwin-style paths) support
      # https://github.com/conan-io/conan-center-index/issues/25245
      if self.options.xml and not self.clang_windows:
        self.requires('libxml2/2.10.4')

      if self.options.heif:
        self.requires('libheif/1.16.2')
        self.requires('libaom-av1/3.6.0')
        self.requires('libde265/1.0.12')

      if self.options.jbig:
        self.requires('jbig/20160605')

      if self.options.exr:
        self.requires('openexr/3.2.4')

      if self.options.png:
        self.requires('libpng/1.6.43')

      if self.options.webp:
        self.requires('libwebp/1.4.0', force=True)

      if self.options.jpeg2000 or self.options.jpeg or self.options.tiff or self.options.raw:
        self.requires('libjpeg-turbo/3.0.2', force=True)

      if self.options.jpeg2000:
        self.requires('jasper/4.2.0', force=True)
        self.requires('openjpeg/2.5.2')

      if self.options.tiff:
        self.requires('libtiff/4.6.0')

      if self.options.raw:
        self.requires('libraw/0.21.2')

      if self.options.cairo and self.settings.arch != 'wasm':
        self.requires('cairo/1.17.8', force=True)
        self.requires('expat/2.6.3', force=True)

      if self.options.jxl:
        self.requires('libjxl/0.6.1')
        self.requires('brotli/1.1.0')
        if self.options.simd:
          self.requires('highway/1.0.3')

      if self.options.openmp and self.settings.arch != 'wasm' and self.settings.os != 'Windows':
        try:
          print('Checking for perl with Encode module')
          self.run('perl -e "use Encode"', stderr=StringIO(), stdout=StringIO())
          self.requires('llvm-openmp/12.0.1')
          print('perl with Encode module found, enabling LLVM OpenMP')
        except Exception:
          print('No perl found, disabling LLVM OpenMP')

      if self.options.display and self.settings.arch != 'wasm':
        self.requires('pixman/0.43.4', force=True)

    def layout(self):
      if self.clang_windows and 'zlib' in self.dependencies:
        # https://github.com/conan-io/conan-center-index/issues/23058
        print('Monkey patching zlib')
        zlib = self.dependencies.host['zlib']._conanfile
        zlib._package_info = zlib.package_info
        def zlib_package_info():
          zlib._package_info()
          zlib.cpp_info.libs = ['z']
        zlib.package_info = zlib_package_info

    def configure(self):
      # clang on Windows is still unpaved
      self.clang_windows = self.settings.os == 'Windows' and self.settings.compiler == "clang"

      # libffi does not compile on Windows with clang: https://github.com/conan-io/conan-center-index/issues/25241 
      self.glib_available = not self.clang_windows

      # Fonts are not available on WASM targets
      self.fonts_enabled = self.options.fonts and self.settings.arch != 'wasm' and not self.clang_windows

      if not self.options.conan or npm_option('external', False):
        return

      if self.settings.arch != 'wasm' and self.options.fonts:
        self.options['harfbuzz'].with_glib = self.glib_available

      if self.options.raw:
        if self.clang_windows:
          self.options['libraw'].with_lcms = False

      if self.options.cairo and self.settings.arch != 'wasm':
        self.options['cairo'].with_png = self.options.png
        self.options['cairo'].with_glib = self.fonts_enabled and self.glib_available
        self.options['cairo'].with_zlib = self.options.gzip
        self.options['cairo'].with_freetype = self.fonts_enabled
        self.options['cairo'].with_fontconfig = self.fonts_enabled and self.settings.os != 'Windows'

      # While Emscripten supports SIMD, Node.js does not and cannot run the resulting WASM bundle
      # The performance gain is not very significant and it has a huge compatibility issue
      if self.options.webp and (self.settings.arch == 'wasm' or not self.options.simd):
        self.options['libwebp'].with_simd = False

    # We don't want the conan build system - conan works best with the platforms' defaults
    # We always use ninja on all platforms (this is the meson approach)
    #
    # conan uses its own meson and ninja
    # we use our own meson (hadron xpack) and ninja (xpack)
    # however everyone shares the same Python (hadron xpack) and cmake (xpack)
    # (although conan supports replacing its meson and ninja,
    # this is a source of trouble and brings no benefits)
    #
    # This is the least opionated approach - no one imposes anything
    # and conan remains optional
    def generate(self):
      tc = CMakeToolchain(self)
      tc.blocks.remove('generic_system')
      tc.generate()
