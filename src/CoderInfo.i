// A specialized typemap for coderInfoList which takes an std::vector* argument
// which serves as a result holder -> we transform it to a function that
// returns that std::vector for which we have a SWIG wrapper in 'std_vector.i'
%typemap(in, numinputs=0) std::vector<Magick::CoderInfo> *container_ (std::vector<Magick::CoderInfo> temp) {
  $1 = new std::vector<Magick::CoderInfo>;
}

%typemap(argout)          std::vector<Magick::CoderInfo> *container_ {
  $result = SWIG_Napi_NewPointerObj(env, $1, $1_descriptor, SWIG_POINTER_OWN);
}
