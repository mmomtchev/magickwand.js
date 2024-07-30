/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.4
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: DrawableCircle (_Magick_DrawableCircle) */
// jsnapi_getclass
Napi::Function _Magick_DrawableCircle_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_DrawableCircle_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_DrawableCircle_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_DrawableCircle_inst>::DefineClass(env, "DrawableCircle", symbolTable);
}

void _Magick_DrawableCircle_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_DrawableCircle_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_DrawableCircle_templ::PropertyDescriptor> &staticMembers
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
      _Magick_DrawableCircle_templ::InstanceMethod("call",
        &_Magick_DrawableCircle_templ::_wrap_Magick_DrawableCircle_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_DrawableCircle_templ::InstanceMethod("copy",
        &_Magick_DrawableCircle_templ::_wrap_Magick_DrawableCircle_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("originX");
  members.insert({
    "originX",
      _Magick_DrawableCircle_templ::InstanceMethod("originX",
        &_Magick_DrawableCircle_templ::_wrap_DrawableCircle__wrap_Magick_DrawableCircle_originX,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("originY");
  members.insert({
    "originY",
      _Magick_DrawableCircle_templ::InstanceMethod("originY",
        &_Magick_DrawableCircle_templ::_wrap_DrawableCircle__wrap_Magick_DrawableCircle_originY,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("perimX");
  members.insert({
    "perimX",
      _Magick_DrawableCircle_templ::InstanceMethod("perimX",
        &_Magick_DrawableCircle_templ::_wrap_DrawableCircle__wrap_Magick_DrawableCircle_perimX,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("perimY");
  members.insert({
    "perimY",
      _Magick_DrawableCircle_templ::InstanceMethod("perimY",
        &_Magick_DrawableCircle_templ::_wrap_DrawableCircle__wrap_Magick_DrawableCircle_perimY,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

