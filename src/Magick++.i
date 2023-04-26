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

namespace MagickCore {
  // Global functions are (still) not bound to a namespace
  // and there is both a Magick::CloneString and MagickCore::CloneString
  %rename(Core_CloneString) CloneString;

  // Exposing MagickCore (the old plain C API) to JS is optional
  // It doubles the size of the addon and most of its primitives
  // are very unsafe or completely unusable from a high-level language
#ifdef MAGICKCORE_JS
  // Generate wrappers
  %include "../build/magickcore.i"
#else
  // Simply import the types
  %rename("$ignore", regextarget=1, fullname=1) "^MagickCore::.+";
  %include "../build/magickcore-import.i"
#endif

  %include "../build/magickwand.i"
}

// These are for the Magick::Blob constructors, they allow to transform an incoming Buffer to (void *, size_t)
// The base typemap comes from 'nodejs_buffer.i'
%typemap(in)        (const void* data_,const size_t length_) = (const void* buffer_data, const size_t buffer_len);
%typemap(typecheck) (const void* data_,const size_t length_) = (const void* buffer_data, const size_t buffer_len);

// Magick::Blob::data is a very special case - it returns a const void *
// and we want to make a Buffer out of it:
// * We ignore the original function
// * We create a new one that uses special out arguments
// * The arguments are named so that we can enable the argout typemap in nodejs_buffer.i
%ignore Magick::Blob::data() const;
%extend Magick::Blob {
  void data(void **buffer_data, size_t *buffer_len) const {
    *buffer_data = const_cast<void *>(self->data());
    *buffer_len = self->length();
  }
}

// A specialized typemap for coderInfoList which takes an std::vector* argument
// which serves as a result holder -> we transform it to a function that
// returns that std::vector for which we have a SWIG wrapper in 'std_vector.i'
%typemap(in, numinputs=0) std::vector<Magick::CoderInfo> *container_ (std::vector<Magick::CoderInfo> temp) {
  $1 = new std::vector<Magick::CoderInfo>;
}
%typemap(argout) std::vector<Magick::CoderInfo> *container_ {
  $result = SWIG_Napi_NewPointerObj(env, $1, SWIGTYPE_p_std__vectorT_Magick__CoderInfo_t, SWIG_POINTER_OWN);
}

// These are all the Magick:: header files ordered by dependency
// (as produced by the dependency generator)
%include "../build/magick++.i"

// Templates need to be instantiated - you can't instantiate new ones at runtime
%template(coderInfoArray)   std::vector<Magick::CoderInfo>;
%template(coderInfoList)    Magick::coderInfoList<std::vector<Magick::CoderInfo>>;

%insert(init) %{
// TODO: Find the path on Windows
InitializeMagick(".");
%}
