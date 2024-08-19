/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: DrawableArc (_Magick_DrawableArc) */
// jsnapi_getclass
Napi::Function _Magick_DrawableArc_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_DrawableArc_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_DrawableArc_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_DrawableArc_inst>::DefineClass(env, "DrawableArc", symbolTable);
}

void _Magick_DrawableArc_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_DrawableArc_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_DrawableArc_templ::PropertyDescriptor> &staticMembers
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
      _Magick_DrawableArc_templ::InstanceMethod("call",
        &_Magick_DrawableArc_templ::_wrap_Magick_DrawableArc_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_DrawableArc_templ::InstanceMethod("copy",
        &_Magick_DrawableArc_templ::_wrap_Magick_DrawableArc_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("startX");
  members.insert({
    "startX",
      _Magick_DrawableArc_templ::InstanceMethod("startX",
        &_Magick_DrawableArc_templ::_wrap_DrawableArc__wrap_Magick_DrawableArc_startX,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("startY");
  members.insert({
    "startY",
      _Magick_DrawableArc_templ::InstanceMethod("startY",
        &_Magick_DrawableArc_templ::_wrap_DrawableArc__wrap_Magick_DrawableArc_startY,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("endX");
  members.insert({
    "endX",
      _Magick_DrawableArc_templ::InstanceMethod("endX",
        &_Magick_DrawableArc_templ::_wrap_DrawableArc__wrap_Magick_DrawableArc_endX,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("endY");
  members.insert({
    "endY",
      _Magick_DrawableArc_templ::InstanceMethod("endY",
        &_Magick_DrawableArc_templ::_wrap_DrawableArc__wrap_Magick_DrawableArc_endY,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("startDegrees");
  members.insert({
    "startDegrees",
      _Magick_DrawableArc_templ::InstanceMethod("startDegrees",
        &_Magick_DrawableArc_templ::_wrap_DrawableArc__wrap_Magick_DrawableArc_startDegrees,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("endDegrees");
  members.insert({
    "endDegrees",
      _Magick_DrawableArc_templ::InstanceMethod("endDegrees",
        &_Magick_DrawableArc_templ::_wrap_DrawableArc__wrap_Magick_DrawableArc_endDegrees,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

