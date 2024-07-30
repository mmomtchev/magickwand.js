/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.4
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: PathLinetoVerticalRel (_Magick_PathLinetoVerticalRel) */
// jsnapi_getclass
Napi::Function _Magick_PathLinetoVerticalRel_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_PathLinetoVerticalRel_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_PathLinetoVerticalRel_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_PathLinetoVerticalRel_inst>::DefineClass(env, "PathLinetoVerticalRel", symbolTable);
}

void _Magick_PathLinetoVerticalRel_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_PathLinetoVerticalRel_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_PathLinetoVerticalRel_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, _Magick_VPathBase_templ<_Magick_VPathBase_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  _Magick_VPathBase_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("call");
  members.insert({
    "call",
      _Magick_VPathBase_templ::InstanceMethod("call",
        &_Magick_VPathBase_templ::_wrap_Magick_VPathBase_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_VPathBase_templ::InstanceMethod("copy",
        &_Magick_VPathBase_templ::_wrap_Magick_VPathBase_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("call");
  members.insert({
    "call",
      _Magick_PathLinetoVerticalRel_templ::InstanceMethod("call",
        &_Magick_PathLinetoVerticalRel_templ::_wrap_Magick_PathLinetoVerticalRel_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_PathLinetoVerticalRel_templ::InstanceMethod("copy",
        &_Magick_PathLinetoVerticalRel_templ::_wrap_Magick_PathLinetoVerticalRel_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("y");
  members.insert({
    "y",
      _Magick_PathLinetoVerticalRel_templ::InstanceMethod("y",
        &_Magick_PathLinetoVerticalRel_templ::_wrap_PathLinetoVerticalRel__wrap_Magick_PathLinetoVerticalRel_y,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

