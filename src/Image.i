// Magick::Image::read from (const StorageType type_, const void *pixels_) is a special case
// We want to make it work with a TypedArray
%include "StorageType.i";

%typemap(in)        (const Magick::StorageType type_, void *pixels_) {
  if ($input.IsTypedArray()) {
    Napi::TypedArray array = $input.As<Napi::TypedArray>();
    $1 = GetMagickStorageType(env, array);
    $2 = reinterpret_cast<void*>(reinterpret_cast<uint8_t *>(array.ArrayBuffer().Data()) + array.ByteOffset());
  } else {
    SWIG_exception_fail(SWIG_TypeError, "in method '$symname', argument is not a TypedArray");
  }
}

%typemap(typecheck) (const Magick::StorageType type_, const void *pixels_) {
  return $input.IsTypedArray();
}

%typemap(check)     (const size_t width_, const size_t height_, const std::string &map_,
      const Magick::StorageType type_, const void *pixels_) {
  if ($1 * $2 * $3->size() != info[3].As<Napi::TypedArray>().ElementLength()) {
    SWIG_exception_fail(SWIG_IndexError, "The number of elements in the TypedArray does not match the number of pixels in the image");
  }
}

%typemap(check)     (const ::ssize_t x_, const ::ssize_t y_, const size_t columns_,
      const size_t rows_, const std::string &map_, const Magick::StorageType type_,
      void *pixels_) {
  if ($3 * $4 * $5->size() != info[5].As<Napi::TypedArray>().ElementLength()) {
    SWIG_exception_fail(SWIG_IndexError, "The number of elements in the TypedArray does not match the number of pixels in the image");
  }
}
