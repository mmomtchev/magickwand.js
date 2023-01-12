%module magickwand
%{
/* Includes the header in the wrapper code */
#include <Magick++.h> 
#include <iostream>

using namespace Magick;
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
    SWIG_V8_Raise(e.what());
    SWIG_fail;
  }
}

#define MAGICKCORE_QUANTUM_DEPTH 16
#define MAGICKCORE_HDRI_ENABLE 0
#define _magickcore_restrict
#define magick_restrict

namespace MagickCore {
  %import "magickwand.i"
}

%rename(call) operator();
%rename(clone) operator=;
%rename(equal) operator==;
%rename(notEqual) operator!=;
%rename(gt) operator>;
%rename(lt) operator<;
%rename(gte) operator>=;
%rename(lte) operator<=;

%include "Magick++/Include.h"
%include "Magick++/TypeMetric.h"
%include "Magick++/Geometry.h"
%include "Magick++/Functions.h"
%include "Magick++/Pixels.h"
%include "Magick++/ResourceLimits.h"
%include "Magick++/STL.h"
%include "Magick++/Blob.h"
%include "Magick++/ChannelMoments.h"
%include "Magick++/CoderInfo.h"
%include "Magick++/Color.h"
%include "Magick++/Drawable.h"
%include "Magick++/Exception.h"
%include "Magick++/Montage.h"
%include "Magick++/Image.h"
