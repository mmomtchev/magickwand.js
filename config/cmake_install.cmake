# Install script for directory: /home/mmom/src/magickwand.js/deps/ImageMagick/config

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
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/etc/ImageMagick-7" TYPE FILE FILES
    "/home/mmom/src/magickwand.js/swig/config/delegates.xml"
    "/home/mmom/src/magickwand.js/swig/config/type-apple.xml"
    "/home/mmom/src/magickwand.js/swig/config/type-dejavu.xml"
    "/home/mmom/src/magickwand.js/swig/config/type-ghostscript.xml"
    "/home/mmom/src/magickwand.js/swig/config/type-urw-base35.xml"
    "/home/mmom/src/magickwand.js/swig/config/type-windows.xml"
    "/home/mmom/src/magickwand.js/swig/config/type.xml"
    "/home/mmom/src/magickwand.js/swig/config/policy.xml"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/config/colors.xml"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/config/log.xml"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/config/mime.xml"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/config/quantization-table.xml"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/config/thresholds.xml"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/ImageMagick-7" TYPE FILE FILES
    "/home/mmom/src/magickwand.js/deps/ImageMagick/config/english.xml"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/config/francais.xml"
    "/home/mmom/src/magickwand.js/deps/ImageMagick/config/locale.xml"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/ImageMagick-7/config-Q16HDRI" TYPE FILE FILES "/home/mmom/src/magickwand.js/swig/config/configure.xml")
endif()

