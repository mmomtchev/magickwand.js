// All drawing classes inherit from Magick::DrawableBase, however drawing functions
// expect a Drawable wrapper that can be constructed from Magick::Drawable const &
// C++ does this automagically when generating the function call but we must do it explicitly

%typemap(in)        Magick::Drawable & {
  void *argp;
  // Convert from Magick::DrawableBase as this is what the user has passed
  if (!SWIG_IsOK(SWIG_ConvertPtr($input, &argp, $descriptor(Magick::DrawableBase *), 0))) {
    SWIG_exception_fail(SWIG_TypeError, "in method '$symname', argument $argnum of type 'Magick::Drawable const &'"); 
  }
  if (!argp) {
    SWIG_exception_fail(SWIG_ValueError, "invalid null reference in method '$symname', argument $argnum of type 'Magick::Drawable const &'"); 
  }
  // Construct the Magick::Drawable
  $1 = new Magick::Drawable(* reinterpret_cast< Magick::DrawableBase * >(argp));
}
// And don't forget to release it before leaving the wrapper - it is a local variable
%typemap(freearg)   Magick::Drawable & {
  delete $1;
}
%typemap(ts)        Magick::Drawable & "Magick.DrawableBase";


// Some draw functions accept an std::vector of Magick::Drawable
// For these, we produce an std::vector of wrappers of the Magick::DrawableBase passed in a JS array
%typemap(in)        std::vector<Magick::Drawable> const & {
  if ($input.IsArray()) {
    $1 = new std::vector<Magick::Drawable>;
    Napi::Array array = $input.As<Napi::Array>();
    for (size_t i = 0; i < array.Length(); i++) {
      Magick::DrawableBase *p = nullptr;
      if (!SWIG_IsOK(SWIG_NAPI_ConvertPtr(array.Get(i), reinterpret_cast<void **>(&p), $descriptor(Magick::DrawableBase *), 0)) || p == nullptr) {
        SWIG_exception_fail(SWIG_TypeError, "in method '$symname', array element is not a Magick::Drawable");
      }
      // Emplace the newly constructed wrappers in the std::container
      $1->emplace_back(Magick::Drawable(*p));
    }
  } else {
    SWIG_exception_fail(SWIG_TypeError, "in method '$symname', argument $argnum is not an array");
  }
}
%typemap(freearg)   std::vector<Magick::Drawable> const & {
  delete $1;
}
%typemap(ts)        std::vector<Magick::Drawable> const & "Magick.DrawableBase[]";

// Functions that expect a VPathList will also take a JS array
// Very similar to the previous one, all classes inherit from Magick::VPathBase while
// the methods expect the in-place constructed surrogate Magick::VPath
%typemap(in)        Magick::VPathList const & {
  if ($input.IsArray()) {
    $1 = new Magick::VPathList;
    Napi::Array array = $input.As<Napi::Array>();
    for (size_t i = 0; i < array.Length(); i++) {
      Magick::VPathBase *p = nullptr;
      if (!SWIG_IsOK(SWIG_NAPI_ConvertPtr(array.Get(i), reinterpret_cast<void **>(&p), $descriptor(Magick::VPathBase *), 0)) || p == nullptr) {
        SWIG_exception_fail(SWIG_TypeError, "in method '$symname', array element is not a Magick::VPath");
      }
      // Emplace the newly constructed surrogates in the std::container
      $1->emplace_back(Magick::VPath(*p));
    }
  } else {
    SWIG_exception_fail(SWIG_TypeError, "in method '$symname', argument $argnum is not an array");
  }
}
%typemap(freearg)   Magick::VPathList const & {
  delete $1;
}
%typemap(ts)        Magick::VPathList const & "Magick.VPathBase[]";
