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
