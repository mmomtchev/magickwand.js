// Exposing MagickCore (the old plain C API) to JS is optional
// It doubles the size of the addon and most of its primitives
// are very unsafe or completely unusable from a high-level language
#ifndef MAGICKCORE_JS
// Ignore everything but a few types - *Operator, *Type and Policy* enums
%rename("$ignore", regextarget=1, fullname=1) "^MagickCore::.+";
%rename("%s") MagickCore;
%rename("%s", regextarget=1) ".+Operator$";
%rename("%s", regextarget=1) ".+Op$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Options$";
%rename("%s", regextarget=1, %$not %$isfunction) ".+Type$";
%rename("%s", regextarget=1, %$isconstant) "Magick.+";

// Never ignore the security policy API which is in MagickCore
%rename("%s", regextarget=1) "Policy";
%ignore MagickCore::GetPolicyInfoList;
%rename("%s") MagickCore::IsRightsAuthorized;

// Include all enum items of enums that are not ignored
%rename("%s", regextarget=1, %$isenumitem) "";

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
%typemap(in, numinputs=0, noblock=1) (const char *, size_t *, MagickCore::ExceptionInfo *)
    (MagickCore::ExceptionInfo _global_error, size_t _global_number_policies) {
  $1 = const_cast<char*>("");
  $2 = &_global_number_policies;
  $3 = &_global_error;
  _global_error.severity = MagickCore::ExceptionType::UndefinedException;
}
%typemap(tsout) (const char *, size_t *, MagickCore::ExceptionInfo *) "string[]";
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
%typemap(in, numinputs=0, noblock=1) (MagickCore::ExceptionInfo *) (MagickCore::ExceptionInfo _global_error) {
  $1 = &_global_error;
  _global_error.severity = MagickCore::ExceptionType::UndefinedException;
}
%typemap(argout, noblock=1) (MagickCore::ExceptionInfo *) {
  if (_global_error.severity != MagickCore::ExceptionType::UndefinedException) {
    SWIG_Raise(MagickCore::GetExceptionMessage(_global_error.error_number));
  }
}
// * returning data in a FILE* (only nullptr at the moment)
%typemap(in, numinputs=0, noblock=1) (FILE *) "$1 = SWIG_NULLPTR;"


namespace MagickCore {
  %include "../swig/magickcore.i"
  %include "../swig/magickwand.i"
}
