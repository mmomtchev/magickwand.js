// Magick::Image::read from (const StorageType type_, const void *pixels_) is a special case
// We want to make it work with a TypedArray
%include "StorageType.i";

// This typemap creates a "global" local variable to be used by the check typemap
// A "global" local variable does not have an automatic number
%typemap(in)        (const Magick::StorageType type_, void *pixels_) (Napi::TypedArray _global_typed_array) {
  if ($input.IsTypedArray()) {
    _global_typed_array = $input.As<Napi::TypedArray>();
    $1 = GetMagickStorageType(env, _global_typed_array);
    $2 = reinterpret_cast<void*>(
      reinterpret_cast<uint8_t *>(_global_typed_array.ArrayBuffer().Data()) + _global_typed_array.ByteOffset());
  } else {
    SWIG_exception_fail(SWIG_TypeError, "in method '$symname', argument $argnum is not a TypedArray");
  }
}

%typemap(typecheck) (const Magick::StorageType type_, void *pixels_) {
  return $input.IsTypedArray();
}

%typemap(check)
(const size_t width_, const size_t height_, const std::string &map_, const Magick::StorageType type_, const void *pixels_),
(const size_t columns_, const size_t rows_, const std::string &map_, const Magick::StorageType type_, void *pixels_)
{
  if ($1 * $2 * $3->size() != _global_typed_array.ElementLength()) {
    SWIG_exception_fail(SWIG_IndexError,
      "The number of elements in the TypedArray does not match the number of pixels in the image");
  }
}

%typemap(ts) (const Magick::StorageType type_, void *pixels_) PixelTypedArray;

// These methods will be built without async version
// (they are considered latency-free)
// This is to reduce the RAM requirements when building
// Classes use templates and must be built as a single file
// Github Actions are limited to 7GB of RAM
//
// Sponsorhip of this project will be used for more RAM
%feature("async", "0") Magick::Image::alpha;
%feature("async", "0") Magick::Image::matteColor;
%feature("async", "0") Magick::Image::animationDelay;
%feature("async", "0") Magick::Image::animationIterations;
%feature("async", "0") Magick::Image::backgroundColor;
%feature("async", "0") Magick::Image::baseColumns;
%feature("async", "0") Magick::Image::baseRows;
%feature("async", "0") Magick::Image::baseFilename;
%feature("async", "0") Magick::Image::borderColor;
%feature("async", "0") Magick::Image::channelDepth;
%feature("async", "0") Magick::Image::channels;
%feature("async", "0") Magick::Image::columns;
%feature("async", "0") Magick::Image::debug;
%feature("async", "0") Magick::Image::directory;
%feature("async", "0") Magick::Image::fileSize;
%feature("async", "0") Magick::Image::fillColor;
%feature("async", "0") Magick::Image::fillRule;
%feature("async", "0") Magick::Image::fillPattern;
%feature("async", "0") Magick::Image::filterType;
%feature("async", "0") Magick::Image::font;
%feature("async", "0") Magick::Image::fontFamily;
%feature("async", "0") Magick::Image::fontPointsize;
%feature("async", "0") Magick::Image::fontStyle;
%feature("async", "0") Magick::Image::fontWeight;
%feature("async", "0") Magick::Image::format;
%feature("async", "0") Magick::Image::geometry;
%feature("async", "0") Magick::Image::hasChannel;
%feature("async", "0") Magick::Image::highlightColor;
%feature("async", "0") Magick::Image::isValid;
%feature("async", "0") Magick::Image::label;
%feature("async", "0") Magick::Image::quiet;
%feature("async", "0") Magick::Image::rows;
%feature("async", "0") Magick::Image::textAntiAlias;
%feature("async", "0") Magick::Image::textDirection;
%feature("async", "0") Magick::Image::textEncoding;
%feature("async", "0") Magick::Image::textGravity;
%feature("async", "0") Magick::Image::textInterlineSpacing;
%feature("async", "0") Magick::Image::textInterwordSpacing;
%feature("async", "0") Magick::Image::textKerning;
%feature("async", "0") Magick::Image::textUnderColor;
%feature("async", "0") Magick::Image::verbose;
%feature("async", "0") Magick::Image::xResolution;
%feature("async", "0") Magick::Image::yResolution;




