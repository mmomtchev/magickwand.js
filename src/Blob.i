// These are for the Magick::Blob constructors, they allow to transform an incoming Buffer to (void *, size_t)
// The base typemap comes from 'nodejs_buffer.i'
%typemap(in)        (const void *data_,const size_t length_) = (const void *buffer_data, const size_t buffer_len);
%typemap(typecheck) (const void *data_,const size_t length_) = (const void *buffer_data, const size_t buffer_len);
%typemap(ts)        (const void *data_,const size_t length_) = (const void *buffer_data, const size_t buffer_len);

// Magick::Blob::data is a very special case - it returns a const void *
// and we want to make a Buffer out of it:
// * We ignore the original function
// * We create a new one that uses special out arguments
// * The arguments are named so that we can enable the argout typemap in nodejs_buffer.i
%ignore Magick::Blob::data() const;
%extend Magick::Blob {
  void data(void **buffer_data, size_t *buffer_len) const {
    *buffer_data = const_cast<void *>(self->data());
    *buffer_len = self->length();
  }
}
