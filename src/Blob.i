%include "arraybuffer.i"

// These are for the Magick::Blob constructors, they allow to transform an incoming ArrayBuffer to (void *, size_t)
// The base typemap comes from 'arraybuffer.i'
%typemap(in)        (const void *data_,const size_t length_) = (const void *arraybuffer_data, const size_t arraybuffer_len);
%typemap(typecheck) (const void *data_,const size_t length_) = (const void *arraybuffer_data, const size_t arraybuffer_len);
%typemap(ts)        (const void *data_,const size_t length_) = (const void *arraybuffer_data, const size_t arraybuffer_len);

// Magick::Blob::data is a very special case - it returns a const void *
// and we want to make an ArrayBuffer out of it:
// * We ignore the original function
// * We create a new one that uses special out arguments
// * The arguments are named so that we can enable the argout typemap in arraybuffer.i
%ignore Magick::Blob::data() const;
%extend Magick::Blob {
  void data(void **arraybuffer_data, size_t *arraybuffer_len) const {
    *arraybuffer_data = const_cast<void *>(self->data());
    *arraybuffer_len = self->length();
  }
}
