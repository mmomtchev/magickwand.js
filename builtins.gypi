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
          ' -ofonts=<(fonts)'
          ' -ojpeg=<(jpeg)'
          ' -opng=<(png)'
          ' -otiff=<(tiff)'
          ' -owebp=<(webp)'
          ' -ojpeg2000=<(jpeg2000)'
          ' -oraw=<(raw)'
          ' -oopenmedia=<(openmedia)'
          ' -obrotli=<(brotli)'
          ' -oh265=<(h265)'
          ' -oexr=<(exr)'
          ' -offtw=<(fftw)'
          ' -oheif=<(heif)'
          ' -ojbig=<(jbig)'
          ' -ocms=<(cms)'
          ' -oxml=<(xml)'
          ' -ogzip=<(gzip)'
          ' -ozip=<(zip)'
          ' -obzip2=<(bzip2)'
          ' -ozstd=<(zstd)'
          ' -oxz=<(xz)'
          ' -olzma=<(lzma)'
          ' -osimd=<(simd)'
          ' -oopenmp=<(openmp)'
          ' -odisplay=<(display)'
          ')'
      }
    }],
    ['target_platform != "emscripten"', {
      'variables': {
        'conaninfo':
          '<!(pip3 install --user "conan<2.0.0"'
          ' && cd ../build'
          ' && python3 -m conans.conan install .. -pr:b=default -pr:h=default -of build --build=missing --build=openjpeg'
          ' -ofonts=<(fonts)'
          ' -ojpeg=<(jpeg)'
          ' -opng=<(png)'
          ' -otiff=<(tiff)'
          ' -owebp=<(webp)'
          ' -ojpeg2000=<(jpeg2000)'
          ' -oraw=<(raw)'
          ' -oopenmedia=<(openmedia)'
          ' -obrotli=<(brotli)'
          ' -oh265=<(h265)'
          ' -oexr=<(exr)'
          ' -offtw=<(fftw)'
          ' -oheif=<(heif)'
          ' -ojbig=<(jbig)'
          ' -ocms=<(cms)'
          ' -oxml=<(xml)'
          ' -ogzip=<(gzip)'
          ' -ozip=<(zip)'
          ' -obzip2=<(bzip2)'
          ' -ozstd=<(zstd)'
          ' -oxz=<(xz)'
          ' -olzma=<(lzma)'
          ' -osimd=<(simd)'
          ' -oopenmp=<(openmp)'
          ' -odisplay=<(display)'
          ')'
      }
    }]
  ]
}
