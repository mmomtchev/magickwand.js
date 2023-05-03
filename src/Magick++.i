%module magickwand

%{
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
  } catch (const Magick::Exception &e) {
    SWIG_Raise(e.what());
    SWIG_fail;
  }
}

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

// These need special handling and the functionality they provide
// is already covered
%rename("$ignore", regextarget=1, fullname=1) "^Magick::Pixels";

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
%rename("%s", regextarget=1, %$not %$isfunction) ".+Colorspace$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Compression";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Type$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Channel$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Class$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Gravity$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Interlace$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Layer$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Cap$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Join$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Orientation$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Method$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Quantum$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Intent$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Stretch$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Style$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Method$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Deciratuib$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Endian$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Rule$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Filter$";
#endif

namespace MagickCore {
  // Global functions are (still) not bound to a namespace
  // and there is both a Magick::CloneString and MagickCore::CloneString
  %rename(Core_CloneString) CloneString;

  %include "../build/swig/magickcore.i"
  %include "../build/swig/magickwand.i"
}

// Various special cases - Buffers, TypedArrays, std::vectors...
%include "Image.i"
%include "Blob.i"
%include "CoderInfo.i"
%include "STL.i"
%include "Drawable.i"

// These are all the Magick:: header files ordered by dependency
// (as produced by the dependency generator)
%include "../build/swig/magick++.i"

// Templates need to be instantiated - you can't instantiate new ones at runtime
%template(coderInfoArray)               std::vector<Magick::CoderInfo>;
%template(coderInfoList)                Magick::coderInfoList<std::vector<Magick::CoderInfo>>;
%template(appendImages)                 Magick::appendImages<ImageListIterator>;
%template(averageImages)                Magick::averageImages<ImageListIterator>;
%template(flattenImages)                Magick::flattenImages<ImageListIterator>;
%template(mosaicImages)                 Magick::mosaicImages<ImageListIterator>;
%template(coalesceImages)               Magick::coalesceImages<ImageListIterator, ImageListContainer>;
%template(deconstructImages)            Magick::deconstructImages<ImageListIterator, ImageListContainer>;
%template(forwardFourierTransformImage) Magick::forwardFourierTransformImage<ImageListContainer>;
%template(montageImages)                Magick::montageImages<ImageListContainer, ImageListIterator>;
%template(morphImages)                  Magick::morphImages<ImageListIterator, ImageListContainer>;
%template(readImages)                   Magick::readImages<ImageListContainer>;
%template(writeImages)                  Magick::writeImages<ImageListIterator>;

%insert(init) %{
// TODO: Find the path on Windows
InitializeMagick(".");
%}
