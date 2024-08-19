/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: filterTypeImage (_Magick_filterTypeImage) */
// jsnapi_getclass
Napi::Function _Magick_filterTypeImage_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_filterTypeImage_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_filterTypeImage_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_filterTypeImage_inst>::DefineClass(env, "filterTypeImage", symbolTable);
}

void _Magick_filterTypeImage_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_filterTypeImage_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_filterTypeImage_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("callAsync");
  members.insert({
    "callAsync",
      _Magick_filterTypeImage_templ::InstanceMethod("callAsync",
        &_Magick_filterTypeImage_templ::_wrap_Magick_filterTypeImage_callAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("call");
  members.insert({
    "call",
      _Magick_filterTypeImage_templ::InstanceMethod("call",
        &_Magick_filterTypeImage_templ::_wrap_Magick_filterTypeImage_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

