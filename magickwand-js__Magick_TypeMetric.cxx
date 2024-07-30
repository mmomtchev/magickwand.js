/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.4
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: TypeMetric (_Magick_TypeMetric) */
// jsnapi_getclass
Napi::Function _Magick_TypeMetric_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_TypeMetric_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_TypeMetric_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_TypeMetric_inst>::DefineClass(env, "TypeMetric", symbolTable);
}

void _Magick_TypeMetric_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_TypeMetric_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_TypeMetric_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("ascent");
  members.insert({
    "ascent",
      _Magick_TypeMetric_templ::InstanceMethod("ascent",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_ascent,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("bounds");
  members.insert({
    "bounds",
      _Magick_TypeMetric_templ::InstanceMethod("bounds",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_bounds,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("descent");
  members.insert({
    "descent",
      _Magick_TypeMetric_templ::InstanceMethod("descent",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_descent,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("maxHorizontalAdvance");
  members.insert({
    "maxHorizontalAdvance",
      _Magick_TypeMetric_templ::InstanceMethod("maxHorizontalAdvance",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_maxHorizontalAdvance,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("origin");
  members.insert({
    "origin",
      _Magick_TypeMetric_templ::InstanceMethod("origin",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_origin,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("pixelsPerEm");
  members.insert({
    "pixelsPerEm",
      _Magick_TypeMetric_templ::InstanceMethod("pixelsPerEm",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_pixelsPerEm,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("textHeight");
  members.insert({
    "textHeight",
      _Magick_TypeMetric_templ::InstanceMethod("textHeight",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_textHeight,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("textWidth");
  members.insert({
    "textWidth",
      _Magick_TypeMetric_templ::InstanceMethod("textWidth",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_textWidth,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("underlinePosition");
  members.insert({
    "underlinePosition",
      _Magick_TypeMetric_templ::InstanceMethod("underlinePosition",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_underlinePosition,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("underlineThickness");
  members.insert({
    "underlineThickness",
      _Magick_TypeMetric_templ::InstanceMethod("underlineThickness",
        &_Magick_TypeMetric_templ::_wrap_Magick_TypeMetric_underlineThickness,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

