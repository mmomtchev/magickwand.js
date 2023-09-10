%define PixelTypedArray
"Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | "
"Float32Array | Float64Array"
#if (NAPI_VERSION > 5)
" | BigUint64Array"
#endif
%enddef

%{
inline Magick::StorageType GetMagickStorageType(Napi::Env env, const Napi::TypedArray &array) {
  switch (array.TypedArrayType()) {
    case napi_int8_array:
    case napi_uint8_array:
    case napi_uint8_clamped_array:
      return MagickCore::CharPixel;
    case napi_int16_array:
    case napi_uint16_array:
      return MagickCore::ShortPixel;
    case napi_int32_array:
    case napi_uint32_array:
      return MagickCore::LongPixel;
    case napi_float32_array:
      return MagickCore::FloatPixel;
    case napi_float64_array:
      return MagickCore::DoublePixel;
#if (NAPI_VERSION > 5)
    case napi_bigint64_array:
    case napi_biguint64_array:
#endif  // (NAPI_VERSION > 5)
      return MagickCore::LongLongPixel;
  }
  SWIG_Error(SWIG_ERROR, "Invalid type");
  // Avoid a warning
  return MagickCore::CharPixel;
}
%}
