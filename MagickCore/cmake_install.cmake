# Install script for directory: /home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/usr/local")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Release")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set default install directory permissions.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/usr/bin/objdump")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "/home/mmom/src/magickwand.js/swig/MagickCore/libMagickCore-7.Q16HDRI.a")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/ImageMagick-7/MagickCore" TYPE FILE FILES
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/MagickCore.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/animate.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/annotate.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/artifact.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/attribute.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/blob.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/cache.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/cache-view.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/channel.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/cipher.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/client.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/coder.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/color.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/colormap.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/colorspace.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/compare.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/composite.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/compress.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/configure.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/constitute.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/decorate.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/delegate.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/deprecate.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/display.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/distort.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/distribute-cache.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/draw.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/effect.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/enhance.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/exception.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/feature.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/fourier.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/fx.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/gem.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/geometry.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/histogram.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/identify.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/image.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/image-view.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/layer.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/linked-list.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/list.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/locale_.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/log.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/magic.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/magick.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/magick-config.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/magick-type.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/matrix.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/memory_.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/method-attribute.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/methods.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/mime.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/module.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/monitor.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/montage.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/morphology.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/nt-base.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/opencl.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/option.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/paint.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/pixel.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/pixel-accessor.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/policy.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/prepress.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/profile.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/property.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/quantize.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/quantum.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/random_.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/registry.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/resample.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/resize.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/resource_.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/segment.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/semaphore.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/shear.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/signature.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/splay-tree.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/static.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/statistic.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/stream.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/string_.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/studio.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/timer.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/token.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/transform.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/threshold.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/type.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/utility.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/vision.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/visual-effects.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/widget.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/xml-tree.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickCore/xwindow.h"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/ImageMagick-7/MagickCore" TYPE FILE FILES
    "/home/mmom/src/magickwand.js/swig/MagickCore/magick-baseconfig.h"
    "/home/mmom/src/magickwand.js/swig/MagickCore/version.h"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE FILE FILES
    "/home/mmom/src/magickwand.js/swig/MagickCore/MagickCore.pc"
    "/home/mmom/src/magickwand.js/swig/MagickCore/MagickCore-7.Q16HDRI.pc"
    "/home/mmom/src/magickwand.js/swig/MagickCore/ImageMagick.pc"
    "/home/mmom/src/magickwand.js/swig/MagickCore/ImageMagick-7.Q16HDRI.pc"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/MagickCoreTargets.cmake")
    file(DIFFERENT _cmake_export_file_changed FILES
         "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/MagickCoreTargets.cmake"
         "/home/mmom/src/magickwand.js/swig/MagickCore/CMakeFiles/Export/c220ae0af1591e9e9e916bba91f25986/MagickCoreTargets.cmake")
    if(_cmake_export_file_changed)
      file(GLOB _cmake_old_config_files "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/MagickCoreTargets-*.cmake")
      if(_cmake_old_config_files)
        string(REPLACE ";" ", " _cmake_old_config_files_text "${_cmake_old_config_files}")
        message(STATUS "Old export file \"$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/MagickCoreTargets.cmake\" will be replaced.  Removing files [${_cmake_old_config_files_text}].")
        unset(_cmake_old_config_files_text)
        file(REMOVE ${_cmake_old_config_files})
      endif()
      unset(_cmake_old_config_files)
    endif()
    unset(_cmake_export_file_changed)
  endif()
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake" TYPE FILE FILES "/home/mmom/src/magickwand.js/swig/MagickCore/CMakeFiles/Export/c220ae0af1591e9e9e916bba91f25986/MagickCoreTargets.cmake")
  if(CMAKE_INSTALL_CONFIG_NAME MATCHES "^([Rr][Ee][Ll][Ee][Aa][Ss][Ee])$")
    file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake" TYPE FILE FILES "/home/mmom/src/magickwand.js/swig/MagickCore/CMakeFiles/Export/c220ae0af1591e9e9e916bba91f25986/MagickCoreTargets-release.cmake")
  endif()
endif()

