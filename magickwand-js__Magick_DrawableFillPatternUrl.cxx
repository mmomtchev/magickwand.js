/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (https://www.swig.org).
 * Version 5.0.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: DrawableFillPatternUrl (_Magick_DrawableFillPatternUrl) */
// jsnapi_getclass
Napi::Function _Magick_DrawableFillPatternUrl_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_DrawableFillPatternUrl_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_DrawableFillPatternUrl_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_DrawableFillPatternUrl_inst>::DefineClass(env, "DrawableFillPatternUrl", symbolTable);
}

void _Magick_DrawableFillPatternUrl_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_DrawableFillPatternUrl_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_DrawableFillPatternUrl_templ::PropertyDescriptor> &staticMembers
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
  members.erase("call");
  members.insert({
    "call",
      _Magick_DrawableFillPatternUrl_templ::InstanceMethod("call",
        &_Magick_DrawableFillPatternUrl_templ::_wrap_Magick_DrawableFillPatternUrl_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("url");
  members.insert({
    "url",
      _Magick_DrawableFillPatternUrl_templ::InstanceMethod("url",
        &_Magick_DrawableFillPatternUrl_templ::_wrap_DrawableFillPatternUrl__wrap_Magick_DrawableFillPatternUrl_url,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_DrawableFillPatternUrl_templ::InstanceMethod("copy",
        &_Magick_DrawableFillPatternUrl_templ::_wrap_Magick_DrawableFillPatternUrl_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

