/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (https://www.swig.org).
 * Version 4.2.1
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: ChannelMoments (_Magick_ChannelMoments) */
// jsnapi_getclass
Napi::Function _Magick_ChannelMoments_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_ChannelMoments_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_ChannelMoments_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_ChannelMoments_inst>::DefineClass(env, "ChannelMoments", symbolTable);
}

void _Magick_ChannelMoments_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_ChannelMoments_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_ChannelMoments_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("centroidX");
  members.insert({
    "centroidX",
      _Magick_ChannelMoments_templ::InstanceMethod("centroidX",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_centroidX,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("centroidY");
  members.insert({
    "centroidY",
      _Magick_ChannelMoments_templ::InstanceMethod("centroidY",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_centroidY,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("channel");
  members.insert({
    "channel",
      _Magick_ChannelMoments_templ::InstanceMethod("channel",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_channel,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("ellipseAxisX");
  members.insert({
    "ellipseAxisX",
      _Magick_ChannelMoments_templ::InstanceMethod("ellipseAxisX",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_ellipseAxisX,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("ellipseAxisY");
  members.insert({
    "ellipseAxisY",
      _Magick_ChannelMoments_templ::InstanceMethod("ellipseAxisY",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_ellipseAxisY,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("ellipseAngle");
  members.insert({
    "ellipseAngle",
      _Magick_ChannelMoments_templ::InstanceMethod("ellipseAngle",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_ellipseAngle,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("ellipseEccentricity");
  members.insert({
    "ellipseEccentricity",
      _Magick_ChannelMoments_templ::InstanceMethod("ellipseEccentricity",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_ellipseEccentricity,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("ellipseIntensity");
  members.insert({
    "ellipseIntensity",
      _Magick_ChannelMoments_templ::InstanceMethod("ellipseIntensity",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_ellipseIntensity,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("huInvariants");
  members.insert({
    "huInvariants",
      _Magick_ChannelMoments_templ::InstanceMethod("huInvariants",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_huInvariants,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isValid");
  members.insert({
    "isValid",
      _Magick_ChannelMoments_templ::InstanceMethod("isValid",
        &_Magick_ChannelMoments_templ::_wrap_Magick_ChannelMoments_isValid,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

