// These are the bindings for the old plain C API - MagickCore
// Most of it is currently not exposed since
// it doubles the size of the addon and most of its primitives
// are very unsafe or completely unusable from a high-level language

// It contains one interesting element - the C struct MagickCore::Image
// Wrapping it for JavaScript is somewhat tricky but possible
// and it is an interesting example - you can find it at the end

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

// There are no reasons to use this function from JS
%ignore MagickCore::CloneString;

%typemap(out) MagickCore::MagickBooleanType {
  $result = Napi::Boolean::New(env, $1);
}
%typemap(ts) MagickCore::MagickBooleanType "boolean";

// The security API is a plain-C API and it require some special typemaps
// like the special case of GetPolicyList
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

// These typemaps handles returning the Exception information using
// a function argument
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

// Returning data in a FILE* (only nullptr at the moment)
%typemap(in, numinputs=0, noblock=1) (FILE *) "$1 = NULL;"

// Wrapping MagickCore::Image for JS

// First, unignore
// When dealing with the usual C pattern of struct _Struct
// and typedef struct _Struct Struct, renaming should refer
// to the first type as SWIG considers it the base type
%rename("Image", fullname=1) MagickCore::_Image;

// Do not generate default ctor/dtor for Image
%nodefaultctor MagickCore::_Image;
%nodefaultdtor MagickCore::_Image;

// The SWIG builtin typemaps do not have a typemap
// for references to pointers (Magick::image() returns these)
// For SWIG, this is a pointer to pointer
// For us, it is the same as a normal pointer
%typemap(out) MagickCore::Image *&  {
  // Dereference it
  MagickCore::Image *im = *$1;
  // And apply the normal pointer typemap
  $typemap(out, MagickCore::Image *, 1=im);
}
%typemap(ts) MagickCore::Image *&   "$typemap(ts,  MagickCore::Image *)";

namespace MagickCore {
  %include "../swig/magickcore.i"
  %include "../swig/magickwand.i"
}

// MagickCore::Image is a C struct without ctors or dtors
// Here we create those to be used from JS under the hood
%rename("Image") "_Image";
%rename("~Image") "~_Image";
%extend MagickCore::_Image {
  _Image() {
    throw Magick::Exception{"Creating a MagickCore.Image from JS is currently not supported"};
  }
  ~_Image() {
    MagickCore::DestroyImage($self);
  }
};
