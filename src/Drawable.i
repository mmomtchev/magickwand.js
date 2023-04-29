// All drawing classes inherit from Magick::DrawableBase, however drawing functions
// expect a Drawable wrapper that can be constructed from Magick::Drawable const &
// C++ does this automagically when generating the function call but we must do it explicitly

%typemap(in) Magick::Drawable & {
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
%typemap(freearg) Magick::Drawable & {
  delete $1;
}
