%module magickwand

%{
// ImageMagick mandatory compilation options
#include "../src/magick_config.h"

// Includes the header in the wrapper code
#include <Magick++.h>
#include <MagickWand/MagickWand.h>
#include <iostream>

using namespace Magick;

// This can probably be fixed in SWIG
typedef MagickCore::SemaphoreInfo SemaphoreInfo;
typedef MagickCore::ImageInfo _ImageInfo;
%}

%include "cpointer.i"
%include "std_string.i"
%include "std_vector.i"
%include "typemaps.i"
%include "exception.i"

%typemap(in) ssize_t = long;
%typemap(out) ssize_t = long;

%exception {
  try {
    $action
  } catch (const Magick::ErrorBlob &e) {
    SWIG_Raise(e.what());
    SWIG_fail;
  }
}

%include "magick_config.h"

// Shunt __attribute__(x) which is not supported by SWIG
#define _magickcore_restrict
#define magick_restrict
#define __attribute__(x)

// Generic renaming
%rename(call) operator();
%rename(clone) operator=;
%rename(equal) operator==;
%rename(notEqual) operator!=;
%rename(gt) operator>;
%rename(lt) operator<;
%rename(gte) operator>=;
%rename(lte) operator<=;

// Rename some specific ImageMagick operators
%rename(toPixelInfo) operator PixelInfo;
%rename(toString) operator std::string;
%rename(toRectangleInfo) operator MagickCore::RectangleInfo;
%rename(toOffsetInfo) operator MagickCore::OffsetInfo;

// ImageMagick contains some defines that cannot be transformed 
// to a constant
#pragma SWIG nowarn=305

// ImageMagick has a very unusual method of setting
// function defaults
#pragma SWIG nowarn=451

// As many of the plain C structs in MagickCore:: have identically
// named C++ class counterparts in Magick::, we have to use namespaces
%nspace;

// These use va_list and require special handling
%ignore LogMagickEventList;
%ignore ThrowMagickExceptionList;

namespace MagickCore {
  // Global functions are (still) not bound to a namespace
  // and there is both a Magick::CloneString and MagickCore::CloneString
  %rename(Core_CloneString) CloneString;

  // These are all the MagickCore:: header files ordered by dependency
  // (as produced by the dependency generator)
  %include "../build/magickcore.i"
  %include "../build/magickwand.i"
}

// These are all the Magick:: header files ordered by dependency
%include "../build/magick++.i"

%insert(init) %{
// TODO: Find the path on Windows
InitializeMagick(".");
%}