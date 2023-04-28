// These typemaps deal with the Magick::STL functions that expect std-compatible Containers and Iterators

%{
typedef std::vector<Magick::Image>             ImageListContainer;
typedef std::vector<Magick::Image>::iterator   ImageListIterator;
%}

// Functions that expect a starting and ending iterator will be called with a JS array
// For these, we produce an std::list of copies of the images in the array
// Magick::Image uses an automatic internal reference counting system and can be shallow-copied
%typemap(in)        (ImageListIterator first_, ImageListIterator last_) (ImageListContainer temp_list) {
  if ($input.IsArray()) {
    Napi::Array array = $input.As<Napi::Array>();
    for (size_t i = 0; i < array.Length(); i++) {
      Magick::Image *im = nullptr;
      if (!SWIG_IsOK(SWIG_Napi_ConvertPtr(array.Get(i), reinterpret_cast<void **>(&im), $descriptor(Magick::Image *), 0)) || im == nullptr) {
        SWIG_exception_fail(SWIG_TypeError, "in method '$symname', array element is not an Image");
      }
      temp_list.push_back(Magick::Image(*im));
    }
    $1 = temp_list.begin();
    $2 = temp_list.end();
  } else {
    SWIG_exception_fail(SWIG_TypeError, "in method '$symname', argument $argnum is not an array");
  }
}

// Functions that expect a container pointer will likely return this data
// For these, we eliminate this argument and instead return a JS array containing those images
%typemap(in, numinputs=0)   ImageListContainer * (ImageListContainer temp_list) {
  $1 = &temp_list;
}
%typemap(argout)            ImageListContainer * {
  if ($1 != nullptr) {
    Napi::Array array = Napi::Array::New(env, $1->size());
    size_t i = 0;
    for (auto it = $1->begin(); it != $1->end(); it++, i++) {
      Napi::Value element = SWIG_Napi_NewPointerObj(env, new Magick::Image(*it), $descriptor(Magick::Image *), SWIG_POINTER_OWN);
      array.Set(i, element);
    }
    $result = array;
  } else {
    $result = env.Null();
  }
}
