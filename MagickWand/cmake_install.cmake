# Install script for directory: /home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "/home/mmom/src/magickwand.js/swig/MagickWand/libMagickWand-7.Q16HDRI.a")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/ImageMagick-7/MagickWand" TYPE FILE FILES
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/MagickWand.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/animate.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/compare.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/composite.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/conjure.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/deprecate.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/display.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/drawing-wand.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/identify.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/import.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/magick-cli.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/magick-image.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/magick-property.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/method-attribute.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/mogrify.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/montage.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/operation.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/pixel-iterator.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/pixel-wand.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/stream.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/wandcli.h"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/MagickWand/wand-view.h"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE FILE FILES
    "/home/mmom/src/magickwand.js/swig/MagickWand/MagickWand.pc"
    "/home/mmom/src/magickwand.js/swig/MagickWand/MagickWand-7.Q16HDRI.pc"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  if(EXISTS "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/MagickWandTargets.cmake")
    file(DIFFERENT _cmake_export_file_changed FILES
         "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/MagickWandTargets.cmake"
         "/home/mmom/src/magickwand.js/swig/MagickWand/CMakeFiles/Export/c220ae0af1591e9e9e916bba91f25986/MagickWandTargets.cmake")
    if(_cmake_export_file_changed)
      file(GLOB _cmake_old_config_files "$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/MagickWandTargets-*.cmake")
      if(_cmake_old_config_files)
        string(REPLACE ";" ", " _cmake_old_config_files_text "${_cmake_old_config_files}")
        message(STATUS "Old export file \"$ENV{DESTDIR}${CMAKE_INSTALL_PREFIX}/lib/cmake/MagickWandTargets.cmake\" will be replaced.  Removing files [${_cmake_old_config_files_text}].")
        unset(_cmake_old_config_files_text)
        file(REMOVE ${_cmake_old_config_files})
      endif()
      unset(_cmake_old_config_files)
    endif()
    unset(_cmake_export_file_changed)
  endif()
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake" TYPE FILE FILES "/home/mmom/src/magickwand.js/swig/MagickWand/CMakeFiles/Export/c220ae0af1591e9e9e916bba91f25986/MagickWandTargets.cmake")
  if(CMAKE_INSTALL_CONFIG_NAME MATCHES "^([Rr][Ee][Ll][Ee][Aa][Ss][Ee])$")
    file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake" TYPE FILE FILES "/home/mmom/src/magickwand.js/swig/MagickWand/CMakeFiles/Export/c220ae0af1591e9e9e916bba91f25986/MagickWandTargets-release.cmake")
  endif()
endif()

