// This typemap allows methods that accept a Magick::Geometry
// or Magick::Color to also accept a string - it implements
// implicit C++ constructors.
//
// The goal is to be able to write
//
// const im = new Image('640x480', 'black')
//
// instead of
//
// const im = new Image(new Geometry('640x480'), new Color('black'))

%typemap(in) SWIGTYPE &FROM_STRING($*ltype from_string_temp) %{
  // This is a generic typemap that applies
  // to all arguments called FROM_STRING
  if ($input.IsString()) {
    // If the JS argument is a string
    {
      // We apply the default std::string typemap - it parses
      // its argument in a local temporary $1
      std::string *$1;
      $typemap(in, const std::string &);
      // Construct the object from this string
      from_string_temp = $*ltype(*$1);
      // The string is not needed anymore
      delete $1;
    }
    // We then assign the local temporary $1 to the real $1
    $1 = &from_string_temp;
  } else {
    // If the JS argument is not a string, then
    // default typemap applies
    $typemap(in, const $*ltype &);
  }
%}

%define CAN_CONS_FROM_STRING(DECL)
%typemap(in)      const DECL = SWIGTYPE &FROM_STRING;
%typemap(ts)      const DECL "$jstype | string";
%enddef

// These arguments will get the FROM_STRING treatment
CAN_CONS_FROM_STRING(Magick::Geometry &size_);
CAN_CONS_FROM_STRING(Magick::Geometry &geometry_);
CAN_CONS_FROM_STRING(Magick::Geometry &offset_);
CAN_CONS_FROM_STRING(Magick::Color &color_);
CAN_CONS_FROM_STRING(Magick::Color &fillColor_);
CAN_CONS_FROM_STRING(Magick::Color &strokeColor_);
