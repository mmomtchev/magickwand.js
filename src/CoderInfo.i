// A specialized typemap for coderInfoList which takes an std::vector* argument
// which serves as a result holder -> we transform it to a function that
// returns that std::vector for which we have a SWIG wrapper in 'std_vector.i'

// This is one of the two ways to deal with returning an std::vector - by returning
// a JS wrapper for the C++ object which implements size() and get() and by
// manually installing an @@iterator that can be found in ../lib/index.js
// The other one can be found in STL.i - by transforming it to a JS array
%typemap(in, numinputs=0) std::vector<Magick::CoderInfo> *container_ (std::vector<Magick::CoderInfo> temp) {
  $1 = new std::vector<Magick::CoderInfo>;
}

%typemap(argout)          std::vector<Magick::CoderInfo> *container_ {
  $result = SWIG_NAPI_NewPointerObj(env, $1, $1_descriptor, SWIG_POINTER_OWN);
}
%typemap(tsout)           std::vector<Magick::CoderInfo> *container_ "std.coderInfoArray"
