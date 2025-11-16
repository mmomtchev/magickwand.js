from conan import ConanFile
from conan.tools.files import save
from conan.tools import CppInfo
from conan.tools.cmake import CMakeToolchain, CMakeDeps
from conan.tools.meson import MesonToolchain
from os import environ
from io import StringIO

required_conan_version = ">=2.7.0"

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
      'display':   [ True, False ],
      'external':  [ True, False ]
    }

    default_options = {
      'conan':      False,
      'fonts':      True,
      'jpeg':       True,
      'png':        True,
      'tiff':       True,
      'webp':       True,
      'jpeg':       True,
      'jpeg2000':   True,
      'jxl':        False,
      'raw':        True,
      'exr':        True,
      'fftw':       False,
      'heif':       True,
      'jbig':       True,
      'color':      True,
      'xml':        True,
      'gzip':       True,
      'zip':        True,
      'bzip2':      True,
      'zstd':       True,
      'lzma':       True,
      'cairo':      True,
      'openmp':     True,
      'display':    True,
      'simd':       True,
      'external':   False
    }

    # CMakeToolchain is manually instantiated at the end
    # (this should probably go into a hadron-specific conan library)
    generators = [ 'MesonToolchain', 'CMakeDeps' ]

    def requirements(self):
      # Disable all bundled delegates
      if not self.options.conan or self.options.external:
        return

      if self.fonts_enabled:
        if self.glib_available:
          [self.requires(x, force=True) for x in ('libffi/[~3]', 'glib/[~2]')]
        [self.requires(x, force=True) for x in ('freetype/[~2]', 'fribidi/[~1]', 'harfbuzz/[~10]')]
        if self.settings.os != 'Windows':
          self.requires('fontconfig/[~2]')

      if self.options.lzma:
        self.requires('xz_utils/5.4.5')

      if self.options.bzip2:
        self.requires('bzip2/[~1]')

      if self.options.zstd:
        self.requires('zstd/[~1]', force=True)

      if self.options.zip:
        self.requires('libzip/[~1]')

      if self.options.gzip:
        self.requires('zlib/[~1]')

      if self.options.fftw:
        self.requires('fftw/[~3]')

      if self.options.color:
        self.requires('lcms/[~2]')

      # libiconv/libxml use MSYS2 and are not compatible
      # with a clang compiled without MSYS2 (Cygwin-style paths) support
      # https://github.com/conan-io/conan-center-index/issues/25245
      if self.options.xml and not self.clang_windows:
        self.requires('libxml2/[~2]')

      if self.options.heif and not self.settings.arch == 'wasm':
        # libheif does not build with the latest emscripten
        # https://github.com/strukturag/libheif/issues/
        if self.settings.arch == 'wasm':
          self.requires('libheif/1.16.2')
        else:
          self.requires('libheif/[~1]')
        self.requires('libaom-av1/[~3]')
        self.requires('libde265/[~1]')

      if self.options.jbig:
        self.requires('jbig/20160605')

      if self.options.exr:
        self.requires('openexr/[~3]')

      if self.options.png:
        self.requires('libpng/[~1]')

      if self.options.webp:
        self.requires('libwebp/[~1]', force=True)

      if self.options.jpeg2000 or self.options.jpeg or self.options.tiff or self.options.raw:
        self.requires('libjpeg-turbo/[~3]', force=True)

      if self.options.jpeg2000:
        self.requires('jasper/[~4]', force=True)
        self.requires('openjpeg/[~2]')

      if self.options.tiff:
        self.requires('libtiff/[~4]')

      if self.options.raw:
        self.requires('libraw/[~0]')

      if self.options.cairo:
        if self.settings.arch != 'wasm':
          self.requires('cairo/[~1]')
          self.requires('expat/[~2]')
        else:
          print('Disabling cairo, not supported in WASM builds')

      if self.options.jxl:
        self.requires('libjxl/[~0]')
        self.requires('brotli/[~1]')
        if self.options.simd:
          self.requires('highway/[~1]')

      if self.options.openmp:
        if self.settings.arch == 'wasm':
          print('Disabling OpenMP, not supported in WASM builds')
        elif self.settings.os == 'Windows':
          print('Disabling OpenMP, not supported on Windows')
        elif self.settings.os == 'Macos':
          print('Disabling OpenMP, not supported on macOS')
        else:
          try:
            print('Checking for perl with Encode module')
            self.run('perl -e "use Encode"', stderr=StringIO(), stdout=StringIO())
            self.requires('llvm-openmp/[~12]')
            print('perl with Encode module found, enabling LLVM OpenMP')
          except Exception:
            print('No perl found, disabling LLVM OpenMP')

      if self.options.display:
        if self.settings.arch != 'wasm':
          self.requires('pixman/[~0]')
        else:
          print('Disabling Image.display, not supported on Windows')

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

      self.glib_available = True
      if self.clang_windows:
        print('disabling glib, ffli is not supported with clang on Windows: https://github.com/conan-io/conan-center-index/issues/25241')
        self.glib_available = False

      # Fonts are not available on WASM targets
      self.fonts_enabled = self.options.fonts
      if self.fonts_enabled and self.settings.arch == 'wasm':
        print('Disabling font support, not supported in WASM builds')
        self.fonts_enabled = False
      if self.fonts_enabled and self.clang_windows:
        print('Disabling font support, not supported with clang on Windows')
        self.fonts_enabled = False

      if not self.options.conan or self.options.external:
        print('conan not enabled, building against system-installed libraries')
        return
      print('conan enabled, downloading delegate libraries from conan')

      if self.settings.arch != 'wasm' and self.options.fonts:
        self.options['harfbuzz'].with_glib = self.glib_available

      if self.options.raw:
        if self.clang_windows:
          print('disabling lcms, not supported with clang on Windows')
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
