/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (https://www.swig.org).
 * Version 5.0.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: DrawableRectangle (_Magick_DrawableRectangle) */
// jsnapi_getclass
Napi::Function _Magick_DrawableRectangle_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_DrawableRectangle_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_DrawableRectangle_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_DrawableRectangle_inst>::DefineClass(env, "DrawableRectangle", symbolTable);
}

void _Magick_DrawableRectangle_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_DrawableRectangle_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_DrawableRectangle_templ::PropertyDescriptor> &staticMembers
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
      _Magick_DrawableRectangle_templ::InstanceMethod("call",
        &_Magick_DrawableRectangle_templ::_wrap_Magick_DrawableRectangle_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_DrawableRectangle_templ::InstanceMethod("copy",
        &_Magick_DrawableRectangle_templ::_wrap_Magick_DrawableRectangle_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("upperLeftX");
  members.insert({
    "upperLeftX",
      _Magick_DrawableRectangle_templ::InstanceMethod("upperLeftX",
        &_Magick_DrawableRectangle_templ::_wrap_DrawableRectangle__wrap_Magick_DrawableRectangle_upperLeftX,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("upperLeftY");
  members.insert({
    "upperLeftY",
      _Magick_DrawableRectangle_templ::InstanceMethod("upperLeftY",
        &_Magick_DrawableRectangle_templ::_wrap_DrawableRectangle__wrap_Magick_DrawableRectangle_upperLeftY,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("lowerRightX");
  members.insert({
    "lowerRightX",
      _Magick_DrawableRectangle_templ::InstanceMethod("lowerRightX",
        &_Magick_DrawableRectangle_templ::_wrap_DrawableRectangle__wrap_Magick_DrawableRectangle_lowerRightX,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("lowerRightY");
  members.insert({
    "lowerRightY",
      _Magick_DrawableRectangle_templ::InstanceMethod("lowerRightY",
        &_Magick_DrawableRectangle_templ::_wrap_DrawableRectangle__wrap_Magick_DrawableRectangle_lowerRightY,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

