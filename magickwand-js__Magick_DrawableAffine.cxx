/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (https://www.swig.org).
 * Version 4.2.1
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: DrawableAffine (_Magick_DrawableAffine) */
// jsnapi_getclass
Napi::Function _Magick_DrawableAffine_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_DrawableAffine_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_DrawableAffine_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_DrawableAffine_inst>::DefineClass(env, "DrawableAffine", symbolTable);
}

void _Magick_DrawableAffine_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_DrawableAffine_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_DrawableAffine_templ::PropertyDescriptor> &staticMembers
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
      _Magick_DrawableAffine_templ::InstanceMethod("call",
        &_Magick_DrawableAffine_templ::_wrap_Magick_DrawableAffine_call,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("copy");
  members.insert({
    "copy",
      _Magick_DrawableAffine_templ::InstanceMethod("copy",
        &_Magick_DrawableAffine_templ::_wrap_Magick_DrawableAffine_copy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("sx");
  members.insert({
    "sx",
      _Magick_DrawableAffine_templ::InstanceMethod("sx",
        &_Magick_DrawableAffine_templ::_wrap_DrawableAffine__wrap_Magick_DrawableAffine_sx,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("sy");
  members.insert({
    "sy",
      _Magick_DrawableAffine_templ::InstanceMethod("sy",
        &_Magick_DrawableAffine_templ::_wrap_DrawableAffine__wrap_Magick_DrawableAffine_sy,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("rx");
  members.insert({
    "rx",
      _Magick_DrawableAffine_templ::InstanceMethod("rx",
        &_Magick_DrawableAffine_templ::_wrap_DrawableAffine__wrap_Magick_DrawableAffine_rx,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("ry");
  members.insert({
    "ry",
      _Magick_DrawableAffine_templ::InstanceMethod("ry",
        &_Magick_DrawableAffine_templ::_wrap_DrawableAffine__wrap_Magick_DrawableAffine_ry,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("tx");
  members.insert({
    "tx",
      _Magick_DrawableAffine_templ::InstanceMethod("tx",
        &_Magick_DrawableAffine_templ::_wrap_DrawableAffine__wrap_Magick_DrawableAffine_tx,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("ty");
  members.insert({
    "ty",
      _Magick_DrawableAffine_templ::InstanceMethod("ty",
        &_Magick_DrawableAffine_templ::_wrap_DrawableAffine__wrap_Magick_DrawableAffine_ty,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

