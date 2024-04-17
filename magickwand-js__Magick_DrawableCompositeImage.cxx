/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: DrawableCompositeImage (_Magick_DrawableCompositeImage) */
// jsnapi_getclass
Napi::Function _Magick_DrawableCompositeImage_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_DrawableCompositeImage_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_DrawableCompositeImage_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_DrawableCompositeImage_inst>::DefineClass(env, "DrawableCompositeImage", symbolTable);
}

void _Magick_DrawableCompositeImage_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_DrawableCompositeImage_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_DrawableCompositeImage_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, _Magick_DrawableBase_templ<_Magick_DrawableBase_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  _Magick_DrawableBase_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("call");
  members.insert({
    "call",
      _Magick_DrawableBase_templ::InstanceMethod("call",
        &_Magick_DrawableBase_templ::_wrap_Magick_DrawableBase_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_DrawableBase_templ::InstanceMethod("copy",
        &_Magick_DrawableBase_templ::_wrap_Magick_DrawableBase_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("clone");
  members.insert({
    "clone",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("clone",
        &_Magick_DrawableCompositeImage_templ::_wrap_Magick_DrawableCompositeImage_clone,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("call");
  members.insert({
    "call",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("call",
        &_Magick_DrawableCompositeImage_templ::_wrap_Magick_DrawableCompositeImage_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("copy",
        &_Magick_DrawableCompositeImage_templ::_wrap_Magick_DrawableCompositeImage_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("composition");
  members.insert({
    "composition",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("composition",
        &_Magick_DrawableCompositeImage_templ::_wrap_DrawableCompositeImage__wrap_Magick_DrawableCompositeImage_composition,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("filename");
  members.insert({
    "filename",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("filename",
        &_Magick_DrawableCompositeImage_templ::_wrap_DrawableCompositeImage__wrap_Magick_DrawableCompositeImage_filename,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("x");
  members.insert({
    "x",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("x",
        &_Magick_DrawableCompositeImage_templ::_wrap_DrawableCompositeImage__wrap_Magick_DrawableCompositeImage_x,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("y");
  members.insert({
    "y",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("y",
        &_Magick_DrawableCompositeImage_templ::_wrap_DrawableCompositeImage__wrap_Magick_DrawableCompositeImage_y,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("width");
  members.insert({
    "width",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("width",
        &_Magick_DrawableCompositeImage_templ::_wrap_DrawableCompositeImage__wrap_Magick_DrawableCompositeImage_width,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("height");
  members.insert({
    "height",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("height",
        &_Magick_DrawableCompositeImage_templ::_wrap_DrawableCompositeImage__wrap_Magick_DrawableCompositeImage_height,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("image");
  members.insert({
    "image",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("image",
        &_Magick_DrawableCompositeImage_templ::_wrap_DrawableCompositeImage__wrap_Magick_DrawableCompositeImage_image,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("magick");
  members.insert({
    "magick",
      _Magick_DrawableCompositeImage_templ::InstanceMethod("magick",
        &_Magick_DrawableCompositeImage_templ::_wrap_DrawableCompositeImage__wrap_Magick_DrawableCompositeImage_magick,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}
