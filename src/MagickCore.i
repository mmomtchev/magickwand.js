// Exposing MagickCore (the old plain C API) to JS is optional
// It doubles the size of the addon and most of its primitives
// are very unsafe or completely unusable from a high-level language
#ifndef MAGICKCORE_JS
// Ignore everything but a few types - *Operator, *Type and Policy* enums
%rename("$ignore", regextarget=1, fullname=1) "^MagickCore::.+";
%rename("%s") MagickCore;
%rename("%s", regextarget=1) ".+Operator$";
%rename("%s", regextarget=1) ".+Op$";
%rename("%s", regextarget=1) ".+Method$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Options$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Type$";
%rename("%s", regextarget=1, %$isconstant) "Magick.+";

// Many of the MagickCore/enhance.h methods do not have Magick++ equivalents
%rename("%s", regextarget=1, %$isfunction) ".+Image$";
// but omit the Get*Image variants, they do low-level stuff
%rename("$ignore", regextarget=1, fullname=1) "^MagickCore::Get.+Image";
// and those from MagickWand
%rename("$ignore", regextarget=1, fullname=1) "^MagickCore::Magick.+Image";
%rename("$ignore", fullname=1) "MagickCore::MatrixToImage";
// and those from distort.h have C-only unsupported semantics
%rename("$ignore", fullname=1) "MagickCore::AffineTransformImage";
%rename("$ignore", fullname=1) "MagickCore::DistortImage";
%rename("$ignore", fullname=1) "MagickCore::SparseColorImage";
// internal methods that should not be wrapped
%rename("$ignore", regextarget=1, fullname=1) "^MagickCore::(R|Unr)egister.+Image";

// Never ignore the security policy API which is in MagickCore
%rename("%s", regextarget=1) "Policy";
%ignore MagickCore::GetPolicyInfoList;
%rename("%s") MagickCore::IsRightsAuthorized;

// Include all enum items of enums that are not ignored
%rename("%s", regextarget=1, %$isenumitem) "";

// Include some generic info methods
%rename("%s") MagickCore::GetMagickCopyright;
%rename("%s") MagickCore::GetMagickDelegates;
%rename("%s") MagickCore::GetMagickFeatures;
%rename("%s") MagickCore::GetMagickLicense;
%rename("%s") MagickCore::GetMagickPackageName;
%rename("%s") MagickCore::GetMagickReleaseDate;

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

// There is are no reasons to use this function from JS
%ignore MagickCore::CloneString;

%typemap(out) MagickCore::MagickBooleanType {
  $result = Napi::Boolean::New(env, $1);
}
%typemap(ts) MagickCore::MagickBooleanType "boolean";

// The security API is a plain-C API and it require some special typemaps, like:
// * the special case of GetPolicyList
%typemap(in, numinputs=0, noblock=1) (const char *, size_t *) (size_t _global_number_policies) {
  $1 = const_cast<char*>("");
  $2 = &_global_number_policies;
}
%typemap(tsout) (const char *, size_t *) "string[]";
%typemap(out) char **GetPolicyList {
  Napi::Array array = Napi::Array::New(env, _global_number_policies);
  if ($1) {
    char **policies = reinterpret_cast<char**>($1);
    for (size_t i = 0; i < _global_number_policies; i++) {
      Napi::String s = Napi::String::New(env, policies[i]);
      array.Set(i, s);
    }
  }
  $result = array;
}
// * returning an exception in an argument
%typemap(in, numinputs=0, noblock=1) (MagickCore::ExceptionInfo *)
  (std::shared_ptr<MagickCore::ExceptionInfo> _global_error) {
  _global_error = std::shared_ptr<MagickCore::ExceptionInfo>(
    MagickCore::AcquireExceptionInfo(),
    [](void *p) {
      MagickCore::DestroyExceptionInfo(static_cast<MagickCore::ExceptionInfo *>(p));
    }
  );
  $1 = _global_error.get();
  _global_error->severity = MagickCore::ExceptionType::UndefinedException;
}
%typemap(argout, noblock=1) (MagickCore::ExceptionInfo *) {
  if (_global_error->severity != MagickCore::ExceptionType::UndefinedException) {
    SWIG_Raise(MagickCore::GetExceptionMessage(_global_error->error_number));
  }
}
// * returning data in a FILE* (only nullptr at the moment)
%typemap(in, numinputs=0, noblock=1) (FILE *) "$1 = NULL;"

// Support casting a C++ Magick::Image object to C MagickCore::Image pointer
%typemap(in) (MagickCore::Image *) {
  // Start by invoking the builtin typemap to obtain a Magick::Image pointer
  Magick::Image *im;
  // Invoke the typemap to place the $1 result in im (defined above)
  $typemap(in, Magick::Image *, 1=im);
  // Use the class method to obtain a MagickCore::Image pointer
  $1 = im->image();
}
%typemap(ts) (MagickCore::Image *) "Magick.Image"

// Support creating a C++ Magick::Image object from a MagickCore::Image pointer
// These functions must be enumerated manually because there are other functions
// in Magick:: that also return MagickCore::Image* and they use different semantics.
// (atm SWIG does not support using regexps here)
%typemap(out) MagickCore::Image *DistortResizeImage,
    MagickCore::Image *EnhanceImage,
    MagickCore::Image *CannyEdgeImage,
    MagickCore::Image *HoughLineImage,
    MagickCore::Image *MeanShiftImage {
  // Create the Magick::Image object
  // ImageMagick does automatic reference counting for images
  // (ie this is a zero-copy operation)
  Magick::Image *im = new Magick::Image(result);
  // Invoke the builtin typemap to create a JS object using im for $1
  // (owner should be used if the method is a constructor/factory)
  $typemap(out, Magick::Image *, 1=im, owner=SWIG_POINTER_OWN);
}

namespace MagickCore {
  %include "../swig/magickcore.i"
  %include "../swig/magickwand.i"
}
