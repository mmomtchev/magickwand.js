/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (https://www.swig.org).
 * Version 4.2.1
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: DrawablePoint (_Magick_DrawablePoint) */
// jsnapi_getclass
Napi::Function _Magick_DrawablePoint_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_DrawablePoint_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_DrawablePoint_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_DrawablePoint_inst>::DefineClass(env, "DrawablePoint", symbolTable);
}

void _Magick_DrawablePoint_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_DrawablePoint_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_DrawablePoint_templ::PropertyDescriptor> &staticMembers
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
      _Magick_DrawablePoint_templ::InstanceMethod("call",
        &_Magick_DrawablePoint_templ::_wrap_Magick_DrawablePoint_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_DrawablePoint_templ::InstanceMethod("copy",
        &_Magick_DrawablePoint_templ::_wrap_Magick_DrawablePoint_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("x");
  members.insert({
    "x",
      _Magick_DrawablePoint_templ::InstanceMethod("x",
        &_Magick_DrawablePoint_templ::_wrap_DrawablePoint__wrap_Magick_DrawablePoint_x,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("y");
  members.insert({
    "y",
      _Magick_DrawablePoint_templ::InstanceMethod("y",
        &_Magick_DrawablePoint_templ::_wrap_DrawablePoint__wrap_Magick_DrawablePoint_y,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

