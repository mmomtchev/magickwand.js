%module magickwand

%{
// ImageMagick mandatory compilation options
#define MAGICKCORE_QUANTUM_DEPTH 16
#define MAGICKCORE_HDRI_ENABLE 1

// Includes the header in the wrapper code
#include <Magick++.h>
#include <MagickWand/MagickWand.h>
#include <iostream>

using namespace Magick;

// Work around https://github.com/swig/swig/issues/2553
typedef MagickCore::_MagickWand _MagickWand;
typedef MagickCore::_WandView _WandView;
typedef MagickCore::_PixelIterator _PixelIterator;
typedef MagickCore::_PixelWand _PixelWand;
typedef MagickCore::_DrawingWand _DrawingWand;
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

// ImageMagick mandatory compilation options
#define MAGICKCORE_QUANTUM_DEPTH 16
#define MAGICKCORE_HDRI_ENABLE 1

// Short-cut __attribute__(x) which is not supported by SWIG
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

namespace MagickCore {
  %include "../build/magickcore.i"
  %include "../build/magickwand.i"
}
%include "../build/magick++.i"

%insert(init) %{
// TODO: Find the path on Windows
InitializeMagick(".");
%}