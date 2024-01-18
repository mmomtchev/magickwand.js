/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (https://www.swig.org).
 * Version 5.0.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: x11DisplayImage (_Magick_x11DisplayImage) */
// jsnapi_getclass
Napi::Function _Magick_x11DisplayImage_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_x11DisplayImage_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_x11DisplayImage_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_x11DisplayImage_inst>::DefineClass(env, "x11DisplayImage", symbolTable);
}

void _Magick_x11DisplayImage_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_x11DisplayImage_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_x11DisplayImage_templ::PropertyDescriptor> &staticMembers
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
      _Magick_x11DisplayImage_templ::InstanceMethod("callAsync",
        &_Magick_x11DisplayImage_templ::_wrap_Magick_x11DisplayImage_callAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("call");
  members.insert({
    "call",
      _Magick_x11DisplayImage_templ::InstanceMethod("call",
        &_Magick_x11DisplayImage_templ::_wrap_Magick_x11DisplayImage_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

