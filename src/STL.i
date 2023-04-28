// These typemaps deal with the Magick::STL functions that expect std-compatible Containers and Iterators

%{
#include <list>

// All ImageMagick functions expect containers of objects (Images) and we can't get anything but pointers
// Alas, this is a problem without a solution until C++20 which we prefer to avoid
// https://stackoverflow.com/questions/76129435/pointer-wrapper-with-reference-like-behaviour/76129935#76129935

// This class implements an object that contains a pointer to an image but
// it is otherwise compatible with the use the container functions make of it
class ImagePtr {
  Magick::Image *ptr;
public:
  ImagePtr(Magick::Image *_ptr) : ptr(_ptr) {};
  MagickCore::Image *&image(void) { return ptr->image(); };
  const MagickCore::Image *constImage(void) const { return ptr->image(); };
  void modifyImage(void) { ptr->modifyImage(); };
};
%}

// Functions that expect a starting and ending iterator will be called with a JS array
// For these, we produce an std::list of pointers to the images in the array
%typemap(in)        (
  std::list<ImagePtr>::iterator first_,
  std::list<ImagePtr>::iterator last_
) (std::list<ImagePtr> temp_list) {
  if ($input.IsArray()) {
    Napi::Array array = $input.As<Napi::Array>();
    for (size_t i = 0; i < array.Length(); i++) {
      Magick::Image *im = nullptr;
      if (!SWIG_IsOK(SWIG_Napi_ConvertPtr(array.Get(i), reinterpret_cast<void **>(&im), SWIGTYPE_p_Magick__Image, 0)) || im == nullptr) {
        SWIG_exception_fail(SWIG_TypeError, "in method '$symname', array element is not an Image");
      }
      ImagePtr imptr(im);
      temp_list.push_back(imptr);
    }
    $1 = temp_list.begin();
    $2 = temp_list.end();
  } else {
    SWIG_exception_fail(SWIG_TypeError, "in method '$symname', argument $argnum is not an array");
  }
}
