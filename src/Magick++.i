%module magickwand

#if SWIG_VERSION < 0x040200
#error node-magickwand requires SWIG 4.2.0
#endif

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

// ImageMagick throws instances of Magick::Exception
// Always catch them and rethrow the message them with SWIG_Raise
// SWIG_Raise handles both sync and async throwing
%exception {
  try {
    $action
  } catch (const Magick::Exception &e) {
    SWIG_Raise(e.what());
    SWIG_fail;
  }
}

// We fix the NAPI level to 6 (Node.js >= 14.0, and latest 10.x/12.x)
#define NAPI_VERSION 6  // For the SWIG interface file
%insert(begin) %{
#define NAPI_VERSION 6  // For the generated C++ code
%}

// This allows to insert a comment from the SWIG CLI to
// uniquely identify the generated files for version control
#ifdef GIT_BRANCH
%insert(begin) GIT_BRANCH
#endif

// Shunt __attribute__(x) which is not supported by SWIG
#define _magickcore_restrict
#define magick_restrict
#define __attribute__(x)

// Generic renaming
%rename(call)     operator();
%rename(clone)    operator=;
%rename(equal)    operator==;
%rename(notEqual) operator!=;
%rename(gt)       operator>;
%rename(lt)       operator<;
%rename(gte)      operator>=;
%rename(lte)      operator<=;

// Rename some specific ImageMagick operators
%rename(toString)         operator std::string;

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

// Initialization is managed by the module
%ignore InitializeMagick;
%ignore TerminateMagick;

// These seem to lack an implementation?
%ignore penTextureImage;
%ignore penColorImage;
%ignore mergeLayersImage;
%ignore sigmoidalContrastImage;
%ignore Magick::Montage::compose;

// These cannot be used safely from JavaScript
%rename("$ignore", regextarget=1) "NoCopy$";
%rename("$ignore", regextarget=1) "Allocator";
%ignore Magick::CloneString;
%ignore Magick::throwException;
%ignore Magick::throwExceptionExplicit;
%ignore Magick::formatExceptionMessage;
%ignore Magick::createException;
%ignore Magick::Image::Image(MagickCore::Image *image_);
// Ignore the Magick::Exceptions, these do not inherit from JS Error
// and are not very practical, we throw everything as JS Error
// with the original message (see above)
%rename("$ignore", regextarget=1, fullname=1) "^Magick::Exception";
%rename("$ignore", regextarget=1, fullname=1) "^Magick::Error";
%rename("$ignore", regextarget=1, fullname=1) "^Magick::Warning";

// These need special handling and the functionality they provide
// is already covered
%ignore Magick::Pixels;
%ignore Magick::PixelData;

// Get all the basic types from MagickCore::*
// Everything else is optional
%include "MagickCore.i"

// Enable async on select classes
// Async is very expensive (compilation-wise) and free Github Actions runners
// are limited to 7GB. Sponsorship of this project will go a long way
// towards more features.
%feature("async:locking", "1");
%define LOCKED_ASYNC(TYPE)
%apply SWIGTYPE  LOCK {TYPE};
%apply SWIGTYPE *LOCK {TYPE *};
%apply SWIGTYPE &LOCK {TYPE &};
%feature("async", "Async") TYPE;
%enddef
%include "AsyncClasses.i"
// And some global functions
%feature("async", "Async") Magick::appendImages;
%feature("async", "Async") Magick::forwardFourierTransformImage;
%feature("async", "Async") Magick::readImages;
%feature("async", "Async") Magick::writeImages;
// These do not need async (on any class)
%feature("async", "0") *::copy;
%feature("async", "0") *::operator=;
%feature("async", "0") *::operator<;
%feature("async", "0") *::operator>;
%feature("async", "0") *::operator<=;
%feature("async", "0") *::operator>=;
%feature("async", "0") *::operator==;
%feature("async", "0") *::operator!=;

// Various special cases - Buffers, TypedArrays, std::vectors...
%include "Image.i"
%include "Blob.i"
%include "CoderInfo.i"
%include "STL.i"
%include "Drawable.i"

// Convenience implicit casting
%include "ImplicitCasting.i"

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
