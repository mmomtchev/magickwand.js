/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.3
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: ChannelPerceptualHash (_Magick_ChannelPerceptualHash) */
// jsnapi_getclass
Napi::Function _Magick_ChannelPerceptualHash_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_ChannelPerceptualHash_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_ChannelPerceptualHash_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_ChannelPerceptualHash_inst>::DefineClass(env, "ChannelPerceptualHash", symbolTable);
}

void _Magick_ChannelPerceptualHash_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_ChannelPerceptualHash_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_ChannelPerceptualHash_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("toString");
  members.insert({
    "toString",
      _Magick_ChannelPerceptualHash_templ::InstanceMethod("toString",
        &_Magick_ChannelPerceptualHash_templ::_wrap_Magick_ChannelPerceptualHash_toString,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("channel");
  members.insert({
    "channel",
      _Magick_ChannelPerceptualHash_templ::InstanceMethod("channel",
        &_Magick_ChannelPerceptualHash_templ::_wrap_Magick_ChannelPerceptualHash_channel,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isValid");
  members.insert({
    "isValid",
      _Magick_ChannelPerceptualHash_templ::InstanceMethod("isValid",
        &_Magick_ChannelPerceptualHash_templ::_wrap_Magick_ChannelPerceptualHash_isValid,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("sumSquaredDifferences");
  members.insert({
    "sumSquaredDifferences",
      _Magick_ChannelPerceptualHash_templ::InstanceMethod("sumSquaredDifferences",
        &_Magick_ChannelPerceptualHash_templ::_wrap_Magick_ChannelPerceptualHash_sumSquaredDifferences,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("srgbHuPhash");
  members.insert({
    "srgbHuPhash",
      _Magick_ChannelPerceptualHash_templ::InstanceMethod("srgbHuPhash",
        &_Magick_ChannelPerceptualHash_templ::_wrap_Magick_ChannelPerceptualHash_srgbHuPhash,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("hclpHuPhash");
  members.insert({
    "hclpHuPhash",
      _Magick_ChannelPerceptualHash_templ::InstanceMethod("hclpHuPhash",
        &_Magick_ChannelPerceptualHash_templ::_wrap_Magick_ChannelPerceptualHash_hclpHuPhash,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

