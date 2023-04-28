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
// (it is the continuation of SWIG#2553)
typedef MagickCore::SemaphoreInfo SemaphoreInfo;
typedef MagickCore::ImageInfo _ImageInfo;
%}

%include ""
%include "cpointer.i"
%include "std_string.i"
%include "std_vector.i"
%include "typemaps.i"
%include "exception.i"
%include "nodejs_buffer.i"

%apply unsigned { size_t };
%apply int { ssize_t };

%exception {
  try {
    $action
  } catch (const Magick::Error &e) {
    SWIG_Raise(e.what());
    SWIG_fail;
  }
}

// This one is for SWIG itself (the previous one goes into the generated file)
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

// These cannot be used safely from JavaScript
%rename("$ignore", regextarget=1) "NoCopy$";
%rename("$ignore", regextarget=1) "Allocator";

// Exposing MagickCore (the old plain C API) to JS is optional
// It doubles the size of the addon and most of its primitives
// are very unsafe or completely unusable from a high-level language
#ifndef MAGICKCORE_JS
// Ignore everything but a few types - *Operator and *Type enums
%rename("$ignore", regextarget=1, fullname=1) "^MagickCore::.+";
%rename("%s") MagickCore;
%rename("%s", regextarget=1) ".+Operator$";
%rename("%s", regextarget=1) ".+Op$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Options$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Type$";
#endif

namespace MagickCore {
  // Global functions are (still) not bound to a namespace
  // and there is both a Magick::CloneString and MagickCore::CloneString
  %rename(Core_CloneString) CloneString;

  %include "../build/magickcore.i"
  %include "../build/magickwand.i"
}

// Various special cases - Buffers, TypedArrays, std::vectors...
%include "Image.i"
%include "Blob.i"
%include "CoderInfo.i"
%include "STL.i"

// These are all the Magick:: header files ordered by dependency
// (as produced by the dependency generator)
%include "../build/magick++.i"

// Templates need to be instantiated - you can't instantiate new ones at runtime
%template(coderInfoArray)   std::vector<Magick::CoderInfo>;
%template(coderInfoList)    Magick::coderInfoList<std::vector<Magick::CoderInfo>>;
%template(appendImages)     Magick::appendImages<std::list<ImagePtr>::iterator>;
%template(averageImages)    Magick::averageImages<std::list<ImagePtr>::iterator>;
%template(flattenImages)    Magick::flattenImages<std::list<ImagePtr>::iterator>;
%template(mosaicImages)     Magick::mosaicImages<std::list<ImagePtr>::iterator>;

%insert(init) %{
// TODO: Find the path on Windows
InitializeMagick(".");
%}
