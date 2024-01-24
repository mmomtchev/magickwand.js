/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: Blob (_Magick_Blob) */
// jsnapi_getclass
Napi::Function _Magick_Blob_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_Blob_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_Blob_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_Blob_inst>::DefineClass(env, "Blob", symbolTable);
}

void _Magick_Blob_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_Blob_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_Blob_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("clone");
  members.insert({
    "clone",
      _Magick_Blob_templ::InstanceMethod("clone",
        &_Magick_Blob_templ::_wrap_Magick_Blob_clone,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("base64Async");
  members.insert({
    "base64Async",
      _Magick_Blob_templ::InstanceMethod("base64Async",
        &_Magick_Blob_templ::_wrap_Blob__wrap_Magick_Blob_base64Async,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("base64");
  members.insert({
    "base64",
      _Magick_Blob_templ::InstanceMethod("base64",
        &_Magick_Blob_templ::_wrap_Blob__wrap_Magick_Blob_base64,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("lengthAsync");
  members.insert({
    "lengthAsync",
      _Magick_Blob_templ::InstanceMethod("lengthAsync",
        &_Magick_Blob_templ::_wrap_Magick_Blob_lengthAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("length");
  members.insert({
    "length",
      _Magick_Blob_templ::InstanceMethod("length",
        &_Magick_Blob_templ::_wrap_Magick_Blob_length,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("updateAsync");
  members.insert({
    "updateAsync",
      _Magick_Blob_templ::InstanceMethod("updateAsync",
        &_Magick_Blob_templ::_wrap_Magick_Blob_updateAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("update");
  members.insert({
    "update",
      _Magick_Blob_templ::InstanceMethod("update",
        &_Magick_Blob_templ::_wrap_Magick_Blob_update,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("dataAsync");
  members.insert({
    "dataAsync",
      _Magick_Blob_templ::InstanceMethod("dataAsync",
        &_Magick_Blob_templ::_wrap_Magick_Blob_dataAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("data");
  members.insert({
    "data",
      _Magick_Blob_templ::InstanceMethod("data",
        &_Magick_Blob_templ::_wrap_Magick_Blob_data,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

