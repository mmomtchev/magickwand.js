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
          ' -ofonts=<!(node -p "({ true: \'True\', false: \'False\'})[<(fonts)]")'
          ' -ojpeg=<!(node -p "({ true: \'True\', false: \'False\'})[<(jpeg)]")'
          ' -opng=<!(node -p "({ true: \'True\', false: \'False\'})[<(png)]")'
          ' -otiff=<!(node -p "({ true: \'True\', false: \'False\'})[<(tiff)]")'
          ' -owebp=<!(node -p "({ true: \'True\', false: \'False\'})[<(webp)]")'
          ' -ojpeg2000=<!(node -p "({ true: \'True\', false: \'False\'})[<(jpeg2000)]")'
          ' -oraw=<!(node -p "({ true: \'True\', false: \'False\'})[<(raw)]")'
          ' -oopenmedia=<!(node -p "({ true: \'True\', false: \'False\'})[<(openmedia)]")'
          ' -obrotli=<!(node -p "({ true: \'True\', false: \'False\'})[<(brotli)]")'
          ' -oh265=<!(node -p "({ true: \'True\', false: \'False\'})[<(h265)]")'
          ' -oexr=<!(node -p "({ true: \'True\', false: \'False\'})[<(exr)]")'
          ' -offtw=<!(node -p "({ true: \'True\', false: \'False\'})[<(fftw)]")'
          ' -oheif=<!(node -p "({ true: \'True\', false: \'False\'})[<(heif)]")'
          ' -ojbig=<!(node -p "({ true: \'True\', false: \'False\'})[<(jbig)]")'
          ' -ocms=<!(node -p "({ true: \'True\', false: \'False\'})[<(cms)]")'
          ' -oxml=<!(node -p "({ true: \'True\', false: \'False\'})[<(xml)]")'
          ' -ogzip=<!(node -p "({ true: \'True\', false: \'False\'})[<(gzip)]")'
          ' -ozip=<!(node -p "({ true: \'True\', false: \'False\'})[<(zip)]")'
          ' -obzip2=<!(node -p "({ true: \'True\', false: \'False\'})[<(bzip2)]")'
          ' -ozstd=<!(node -p "({ true: \'True\', false: \'False\'})[<(zstd)]")'
          ' -oxz=<!(node -p "({ true: \'True\', false: \'False\'})[<(xz)]")'
          ' -olzma=<!(node -p "({ true: \'True\', false: \'False\'})[<(lzma)]")'
          ' -osimd=<!(node -p "({ true: \'True\', false: \'False\'})[<(simd)]")'
          ' -oopenmp=<!(node -p "({ true: \'True\', false: \'False\'})[<(openmp)]")'
          ' -odisplay=<!(node -p "({ true: \'True\', false: \'False\'})[<(display)]")'
          ')'
      }
    }],
    ['target_platform != "emscripten"', {
      'variables': {
        'conaninfo':
          '<!(pip3 install --user "conan<2.0.0"'
          ' && cd ../build'
          ' && python3 -m conans.conan install .. -pr:b=default -pr:h=default -of build --build=missing --build=openjpeg'
          ' -ofonts=<!(node -p "({ true: \'True\', false: \'False\'})[<(fonts)]")'
          ' -ojpeg=<!(node -p "({ true: \'True\', false: \'False\'})[<(jpeg)]")'
          ' -opng=<!(node -p "({ true: \'True\', false: \'False\'})[<(png)]")'
          ' -otiff=<!(node -p "({ true: \'True\', false: \'False\'})[<(tiff)]")'
          ' -owebp=<!(node -p "({ true: \'True\', false: \'False\'})[<(webp)]")'
          ' -ojpeg2000=<!(node -p "({ true: \'True\', false: \'False\'})[<(jpeg2000)]")'
          ' -oraw=<!(node -p "({ true: \'True\', false: \'False\'})[<(raw)]")'
          ' -oopenmedia=<!(node -p "({ true: \'True\', false: \'False\'})[<(openmedia)]")'
          ' -obrotli=<!(node -p "({ true: \'True\', false: \'False\'})[<(brotli)]")'
          ' -oh265=<!(node -p "({ true: \'True\', false: \'False\'})[<(h265)]")'
          ' -oexr=<!(node -p "({ true: \'True\', false: \'False\'})[<(exr)]")'
          ' -offtw=<!(node -p "({ true: \'True\', false: \'False\'})[<(fftw)]")'
          ' -oheif=<!(node -p "({ true: \'True\', false: \'False\'})[<(heif)]")'
          ' -ojbig=<!(node -p "({ true: \'True\', false: \'False\'})[<(jbig)]")'
          ' -ocms=<!(node -p "({ true: \'True\', false: \'False\'})[<(cms)]")'
          ' -oxml=<!(node -p "({ true: \'True\', false: \'False\'})[<(xml)]")'
          ' -ogzip=<!(node -p "({ true: \'True\', false: \'False\'})[<(gzip)]")'
          ' -ozip=<!(node -p "({ true: \'True\', false: \'False\'})[<(zip)]")'
          ' -obzip2=<!(node -p "({ true: \'True\', false: \'False\'})[<(bzip2)]")'
          ' -ozstd=<!(node -p "({ true: \'True\', false: \'False\'})[<(zstd)]")'
          ' -oxz=<!(node -p "({ true: \'True\', false: \'False\'})[<(xz)]")'
          ' -olzma=<!(node -p "({ true: \'True\', false: \'False\'})[<(lzma)]")'
          ' -osimd=<!(node -p "({ true: \'True\', false: \'False\'})[<(simd)]")'
          ' -oopenmp=<!(node -p "({ true: \'True\', false: \'False\'})[<(openmp)]")'
          ' -odisplay=<!(node -p "({ true: \'True\', false: \'False\'})[<(display)]")'
          ')'
      }
    }]
  ]
}
