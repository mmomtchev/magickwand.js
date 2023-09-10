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
%rename("%s", regextarget=1, %$not %$isfunction) ".+[Vv]ersion.+";

// Ignore all Magick:: methods with PixelInfo when ignoring MagickCore::PixelInfo
%rename("$ignore", regextarget=1, fullname=1) "PixelInfo";
%ignore operator PixelInfo;
%ignore Magick::Color::operator=(const PixelInfo &);
%ignore Magick::Color::Color(const PixelInfo &);

// Ignore all Magick:: methods with RectangleInfo when ignoring MagickCore::RectangleInfo
%ignore operator MagickCore::RectangleInfo;
%ignore Magick::Geometry::Geometry(const MagickCore::RectangleInfo &);

%ignore operator MagickCore::OffsetInfo;

#else // When including MagickCore
%rename(toPixelInfo)      operator PixelInfo;
%rename(toRectangleInfo)  operator MagickCore::RectangleInfo;
%rename(toOffsetInfo)     operator MagickCore::OffsetInfo;
#endif

namespace MagickCore {
  // Global functions are (still) not bound to a namespace
  // and there is both a Magick::CloneString and MagickCore::CloneString
  %rename(Core_CloneString) CloneString;

  %include "../swig/magickcore.i"
  %include "../swig/magickwand.i"
}
