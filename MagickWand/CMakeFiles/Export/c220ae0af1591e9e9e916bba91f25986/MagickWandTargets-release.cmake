#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "ImageMagick::MagickWand-7.Q16HDRI" for configuration "Release"
set_property(TARGET ImageMagick::MagickWand-7.Q16HDRI APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(ImageMagick::MagickWand-7.Q16HDRI PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "C"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libMagickWand-7.Q16HDRI.a"
  )

list(APPEND _cmake_import_check_targets ImageMagick::MagickWand-7.Q16HDRI )
list(APPEND _cmake_import_check_files_for_ImageMagick::MagickWand-7.Q16HDRI "${_IMPORT_PREFIX}/lib/libMagickWand-7.Q16HDRI.a" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
