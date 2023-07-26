%module magickwand

#define MAGICKCORE_EXCLUDE_DEPRECATED
%{
// Includes the header in the wrapper code
#define MAGICKCORE_EXCLUDE_DEPRECATED
#include <Magick++.h>
#include <MagickWand/MagickWand.h>
#include <iostream>

using namespace Magick;
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

// Enable generation of asynchronous wrappers (using suffix Async)
%feature("async", "Async");
%feature("async:locking", "1");

// We fix the NAPI level to 6 (Node.js >= 14.0, and latest 10.x/12.x)
%insert(begin) %{
#define NAPI_VERSION 6
%}

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

// These seem to lack an implementation?
%ignore penTextureImage;
%ignore penColorImage;
%ignore mergeLayersImage;
%ignore sigmoidalContrastImage;
%ignore Magick::Montage::compose;

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
%rename("%s", regextarget=1, %$isenumitem) ".+Colorspace$";
%rename("%s", regextarget=1, %$isenumitem) ".+Compression";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Type$";
%rename("%s", regextarget=1, %$isenumitem) ".+Channel$";
%rename("%s", regextarget=1, %$isenumitem) ".+Class$";
%rename("%s", regextarget=1, %$isenumitem) ".+Gravity$";
%rename("%s", regextarget=1, %$isenumitem) ".+Interlace$";
%rename("%s", regextarget=1, %$isenumitem) ".+Layer$";
%rename("%s", regextarget=1, %$isenumitem) ".+Cap$";
%rename("%s", regextarget=1, %$isenumitem) ".+Join$";
%rename("%s", regextarget=1, %$isenumitem) ".+Orientation$";
%rename("%s", regextarget=1, %$isenumitem) ".+Method$";
%rename("%s", regextarget=1, %$isenumitem) ".+Quantum$";
%rename("%s", regextarget=1, %$isenumitem) ".+Intent$";
%rename("%s", regextarget=1, %$isenumitem) ".+Stretch$";
%rename("%s", regextarget=1, %$isenumitem) ".+Style$";
%rename("%s", regextarget=1, %$isenumitem) ".+Method$";
%rename("%s", regextarget=1, %$isenumitem) ".+Delegate$";
%rename("%s", regextarget=1, %$isenumitem) ".+Endian$";
%rename("%s", regextarget=1, %$isenumitem) ".+Rule$";
%rename("%s", regextarget=1, %$isenumitem) ".+Filter$";
%rename("%s", regextarget=1, %$isenumitem) ".+Info$";
%rename("%s", regextarget=1, %$isenumitem) ".+[Vv]ersion.+";
#endif

namespace MagickCore {
  // Global functions are (still) not bound to a namespace
  // and there is both a Magick::CloneString and MagickCore::CloneString
  %rename(Core_CloneString) CloneString;

  %include "../swig/magickcore.i"
  %include "../swig/magickwand.i"
}


// Ignore some features for now (to reduce the code size)
// The STL functors
%rename("$ignore", regextarget=1, fullname=1) "^Magick::[a-z][A-Za-z]+Image";
// Some extra features
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::.+Statistics";
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::Channel.+";
%rename("$ignore", fullname=1, %$isclass) "Magick::ResourceLimits";
%rename("$ignore", fullname=1, %$isclass) "Magick::TypeMetric";
%rename("$ignore", fullname=1, %$isclass) "Magick::ImageMoments";
%rename("$ignore", fullname=1, %$isclass) "Magick::ImagePerceptualHash";
%rename("$ignore", fullname=1, %$isclass) "Magick::Offset";
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::Montage.*";
// Extended errors and warnings
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::Warning.+";
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::Error.+";
// Renamed operators
%feature("async", "0") *::copy;
%feature("async", "0") *::operator();
// Drawable / Path (this is coming back)
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::Drawable.*";
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::Path.*";
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::VPath.*";
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::Coordinate.*";
%rename("$ignore", regextarget=1, fullname=1, %$isclass) "^Magick::Point.*";

// Various special cases - Buffers, TypedArrays, std::vectors...
%include "Image.i"
%include "Blob.i"
%include "CoderInfo.i"
%include "STL.i"
%include "Drawable.i"

// These are all the Magick:: header files ordered by dependency
// (as produced by the dependency generator)
%include "../swig/magick++.i"

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
// We link in everything statically
InitializeMagick(".");
%}
