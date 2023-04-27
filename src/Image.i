// Magick::Image::read from (const StorageType type_, const void *pixels_) is a special case
// We want to make it work with a TypedArray
%include "StorageType.i";

%typemap(in)        (const Magick::StorageType type_, const void *pixels_) {
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
