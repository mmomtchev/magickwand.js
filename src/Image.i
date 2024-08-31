// Magick::Image::read & Magick::Image::write with (const StorageType type_, const void *pixels_) are a special case
// We want to make these work with a TypedArray
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

// This check typemap guarantees safety of the TypedArray passed by the user for Image.read
%typemap(check)
(const size_t width_, const size_t height_, const std::string &map_, const Magick::StorageType type_, const void *pixels_)
{
  if ($1 * $2 * $3->size() != _global_typed_array.ElementLength()) {
    SWIG_exception_fail(SWIG_IndexError,
      "The number of elements in the TypedArray does not match the number of pixels in the image");
  }
}

// This check typemap guarantees safety of the TypedArray passed by the user for Image.write
// Additionally it stores a persistent reference for the next typemap in WASM mode
%typemap(check)
(const size_t columns_, const size_t rows_, const std::string &map_, const Magick::StorageType type_, void *pixels_)
(Napi::Reference<Napi::Value> _global_array_ref)
%{
  if ($1 * $2 * $3->size() != _global_typed_array.ElementLength()) {
    SWIG_exception_fail(SWIG_IndexError,
      "The number of elements in the TypedArray does not match the number of pixels in the image");
  }
#ifdef __EMSCRIPTEN__
  _global_array_ref = Napi::Persistent(_global_typed_array.ArrayBuffer().As<Napi::Value>());
#endif
%}

// This is one of the very few differences between Node-API for native modules and emnapi for WASM
// WASM operates with a separate heap, so when going out of the Image.write function we must copy
// the data back to the JS memory space
%typemap(argout) (const size_t columns_, const size_t rows_, const std::string &map_, const Magick::StorageType type_, void *pixels_)
%{
#ifdef __EMSCRIPTEN__
napi_value ab_value = _global_array_ref.Value();
emnapi_sync_memory(env, false, &ab_value, 0, NAPI_AUTO_LENGTH);
#endif
%}

%typemap(ts) (const Magick::StorageType type_, void *pixels_) PixelTypedArray;

// font TypeMetric is returned in a pointer
%typemap(in, numinputs=0) Magick::TypeMetric *metrics %{
  $1 = new Magick::TypeMetric;
%}
%typemap(argout) Magick::TypeMetric *metrics %{
  $result = SWIG_NAPI_NewPointerObj(env, $1, $1_descriptor, SWIG_POINTER_OWN);
  // If we return the object, prevent the next typemap from freeing it
  $1 = nullptr;
%}
%typemap(freearg) Magick::TypeMetric *metrics %{
  // This applies only to the exception path
  delete $1;
%}
%typemap(tsout) Magick::TypeMetric *metrics "Magick.TypeMetric";

%include <arrays_javascript.i>
// Arguments in a C array
%typemap(in) (const size_t numberArguments_, const double *arguments_) {
  // arrays_javascript defines a typemap for double[], just inline it
  // we can't simply %apply because we want to extend it with
  // automatic size
  // The 99 is a workaround for https://github.com/mmomtchev/swig/issues/62
  $2_ltype &arg99 = $2;
  $typemap(in, double [], 1=arg99, 2=$1, argnum=99);
  // we know the size
  $1 = $input.As<Napi::Array>().Length();
}
%typemap(ts) (const size_t numberArguments_, const double *arguments_) "number[]";
// Alternative spelling
%apply (const size_t numberArguments_, const double *arguments_) {
  (const size_t number_arguments_, const double *arguments_)
};

// These methods will be built without async version
// (they are considered latency-free)
// This is to reduce the RAM requirements when building
// Classes use templates and must be built as a single file
// Github Actions are limited to 7GB of RAM
//
// Sponsorship of this project will help a lot
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




