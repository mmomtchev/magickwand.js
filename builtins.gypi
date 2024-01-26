{
  'conditions': [
    ['target_platform == "emscripten"', {
      'variables': {
        # This an ugly hack that enable running of shell commands during node-gyp configure
        # node-gyp configure needs to evaluate this expression to generate the platform-specific files
        # (originally by TooTallNate for libffi) 
        'conaninfo':
          '<!(pip3 install --user "conan<2.0.0"'
          ' && cd build'
          ' && python3 -m conans.conan install .. -pr:b=default -pr:h=../emscripten.profile -of build --build=missing'
          # These translate the JS true/false need for npm to Python True/False needed for conan
          ' -ofonts=<!(node <(module_root_dir)/scripts/true-false.js <(fonts))'
          ' -ojpeg=<!(node <(module_root_dir)/scripts/true-false.js <(jpeg))'
          ' -opng=<!(node <(module_root_dir)/scripts/true-false.js <(png))'
          ' -otiff=<!(node <(module_root_dir)/scripts/true-false.js <(tiff))'
          ' -owebp=<!(node <(module_root_dir)/scripts/true-false.js <(webp))'
          ' -ojpeg2000=<!(node <(module_root_dir)/scripts/true-false.js <(jpeg2000))'
          ' -oraw=<!(node <(module_root_dir)/scripts/true-false.js <(raw))'
          ' -oopenmedia=<!(node <(module_root_dir)/scripts/true-false.js <(openmedia))'
          ' -obrotli=<!(node <(module_root_dir)/scripts/true-false.js <(brotli))'
          ' -oh265=<!(node <(module_root_dir)/scripts/true-false.js <(h265))'
          ' -oexr=<!(node <(module_root_dir)/scripts/true-false.js <(exr))'
          ' -offtw=<!(node <(module_root_dir)/scripts/true-false.js <(fftw))'
          ' -oheif=<!(node <(module_root_dir)/scripts/true-false.js <(heif))'
          ' -ojbig=<!(node <(module_root_dir)/scripts/true-false.js <(jbig))'
          ' -ocms=<!(node <(module_root_dir)/scripts/true-false.js <(cms))'
          ' -oxml=<!(node <(module_root_dir)/scripts/true-false.js <(xml))'
          ' -ogzip=<!(node <(module_root_dir)/scripts/true-false.js <(gzip))'
          ' -ozip=<!(node <(module_root_dir)/scripts/true-false.js <(zip))'
          ' -obzip2=<!(node <(module_root_dir)/scripts/true-false.js <(bzip2))'
          ' -ozstd=<!(node <(module_root_dir)/scripts/true-false.js <(zstd))'
          ' -oxz=<!(node <(module_root_dir)/scripts/true-false.js <(xz))'
          ' -olzma=<!(node <(module_root_dir)/scripts/true-false.js <(lzma))'
          ' -osimd=<!(node <(module_root_dir)/scripts/true-false.js <(simd))'
          ' -oopenmp=<!(node <(module_root_dir)/scripts/true-false.js <(openmp))'
          ' -odisplay=<!(node <(module_root_dir)/scripts/true-false.js <(display))'
          ' 1>&2 )'
      }
    }],
    ['target_platform != "emscripten"', {
      'variables': {
        'conaninfo':
          '<!(pip3 install --user "conan<2.0.0"'
          ' && cd ../build'
          ' && python3 -m conans.conan install .. -pr:b=../posix.profile -pr:h=../posix.profile -of build --build=missing --build=openjpeg'
          ' -ofonts=<!(node <(module_root_dir)/scripts/true-false.js <(fonts))'
          ' -ojpeg=<!(node <(module_root_dir)/scripts/true-false.js <(jpeg))'
          ' -opng=<!(node <(module_root_dir)/scripts/true-false.js <(png))'
          ' -otiff=<!(node <(module_root_dir)/scripts/true-false.js <(tiff))'
          ' -owebp=<!(node <(module_root_dir)/scripts/true-false.js <(webp))'
          ' -ojpeg2000=<!(node <(module_root_dir)/scripts/true-false.js <(jpeg2000))'
          ' -oraw=<!(node <(module_root_dir)/scripts/true-false.js <(raw))'
          ' -oopenmedia=<!(node <(module_root_dir)/scripts/true-false.js <(openmedia))'
          ' -obrotli=<!(node <(module_root_dir)/scripts/true-false.js <(brotli))'
          ' -oh265=<!(node <(module_root_dir)/scripts/true-false.js <(h265))'
          ' -oexr=<!(node <(module_root_dir)/scripts/true-false.js <(exr))'
          ' -offtw=<!(node <(module_root_dir)/scripts/true-false.js <(fftw))'
          ' -oheif=<!(node <(module_root_dir)/scripts/true-false.js <(heif))'
          ' -ojbig=<!(node <(module_root_dir)/scripts/true-false.js <(jbig))'
          ' -ocms=<!(node <(module_root_dir)/scripts/true-false.js <(cms))'
          ' -oxml=<!(node <(module_root_dir)/scripts/true-false.js <(xml))'
          ' -ogzip=<!(node <(module_root_dir)/scripts/true-false.js <(gzip))'
          ' -ozip=<!(node <(module_root_dir)/scripts/true-false.js <(zip))'
          ' -obzip2=<!(node <(module_root_dir)/scripts/true-false.js <(bzip2))'
          ' -ozstd=<!(node <(module_root_dir)/scripts/true-false.js <(zstd))'
          ' -oxz=<!(node <(module_root_dir)/scripts/true-false.js <(xz))'
          ' -olzma=<!(node <(module_root_dir)/scripts/true-false.js <(lzma))'
          ' -osimd=<!(node <(module_root_dir)/scripts/true-false.js <(simd))'
          ' -oopenmp=<!(node <(module_root_dir)/scripts/true-false.js <(openmp))'
          ' -odisplay=<!(node <(module_root_dir)/scripts/true-false.js <(display))'
          ' 1>&2 )'
      }
    }]
  ]
}
