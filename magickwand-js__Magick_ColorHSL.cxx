/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: ColorHSL (_Magick_ColorHSL) */
// jsnapi_getclass
Napi::Function _Magick_ColorHSL_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_ColorHSL_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_ColorHSL_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_ColorHSL_inst>::DefineClass(env, "ColorHSL", symbolTable);
}

void _Magick_ColorHSL_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_ColorHSL_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_ColorHSL_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, _Magick_Color_templ<_Magick_Color_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  _Magick_Color_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("clone");
  members.insert({
    "clone",
      _Magick_Color_templ::InstanceMethod("clone",
        &_Magick_Color_templ::_wrap_Color__wrap_Magick_Color_clone,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("toString");
  members.insert({
    "toString",
      _Magick_Color_templ::InstanceMethod("toString",
        &_Magick_Color_templ::_wrap_Magick_Color_toString,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isFuzzyEquivalent");
  members.insert({
    "isFuzzyEquivalent",
      _Magick_Color_templ::InstanceMethod("isFuzzyEquivalent",
        &_Magick_Color_templ::_wrap_Magick_Color_isFuzzyEquivalent,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("isValid");
  members.insert({
    "isValid",
      _Magick_Color_templ::InstanceMethod("isValid",
        &_Magick_Color_templ::_wrap_Color__wrap_Magick_Color_isValid,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("pixelType");
  members.insert({
    "pixelType",
      _Magick_Color_templ::InstanceMethod("pixelType",
        &_Magick_Color_templ::_wrap_Magick_Color_pixelType,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("quantumAlpha");
  members.insert({
    "quantumAlpha",
      _Magick_Color_templ::InstanceMethod("quantumAlpha",
        &_Magick_Color_templ::_wrap_Color__wrap_Magick_Color_quantumAlpha,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("quantumBlack");
  members.insert({
    "quantumBlack",
      _Magick_Color_templ::InstanceMethod("quantumBlack",
        &_Magick_Color_templ::_wrap_Color__wrap_Magick_Color_quantumBlack,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("quantumBlue");
  members.insert({
    "quantumBlue",
      _Magick_Color_templ::InstanceMethod("quantumBlue",
        &_Magick_Color_templ::_wrap_Color__wrap_Magick_Color_quantumBlue,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("quantumGreen");
  members.insert({
    "quantumGreen",
      _Magick_Color_templ::InstanceMethod("quantumGreen",
        &_Magick_Color_templ::_wrap_Color__wrap_Magick_Color_quantumGreen,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("quantumRed");
  members.insert({
    "quantumRed",
      _Magick_Color_templ::InstanceMethod("quantumRed",
        &_Magick_Color_templ::_wrap_Color__wrap_Magick_Color_quantumRed,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("clone");
  members.insert({
    "clone",
      _Magick_ColorHSL_templ::InstanceMethod("clone",
        &_Magick_ColorHSL_templ::_wrap_Magick_ColorHSL_clone,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("hue");
  members.insert({
    "hue",
      _Magick_ColorHSL_templ::InstanceMethod("hue",
        &_Magick_ColorHSL_templ::_wrap_ColorHSL__wrap_Magick_ColorHSL_hue,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("lightness");
  members.insert({
    "lightness",
      _Magick_ColorHSL_templ::InstanceMethod("lightness",
        &_Magick_ColorHSL_templ::_wrap_ColorHSL__wrap_Magick_ColorHSL_lightness,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("saturation");
  members.insert({
    "saturation",
      _Magick_ColorHSL_templ::InstanceMethod("saturation",
        &_Magick_ColorHSL_templ::_wrap_ColorHSL__wrap_Magick_ColorHSL_saturation,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  // jsnapi_register_static_constant
  staticMembers.erase("CMYKPixel");
  staticMembers.insert({
    "CMYKPixel",
      StaticAccessor("CMYKPixel",
        &_Magick_Color_templ::Magick_Color_CMYKPixel_get,
        &JS_veto_set_static_variable,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_static_constant
  staticMembers.erase("CMYKAPixel");
  staticMembers.insert({
    "CMYKAPixel",
      StaticAccessor("CMYKAPixel",
        &_Magick_Color_templ::Magick_Color_CMYKAPixel_get,
        &JS_veto_set_static_variable,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_static_constant
  staticMembers.erase("RGBPixel");
  staticMembers.insert({
    "RGBPixel",
      StaticAccessor("RGBPixel",
        &_Magick_Color_templ::Magick_Color_RGBPixel_get,
        &JS_veto_set_static_variable,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  // jsnapi_register_static_constant
  staticMembers.erase("RGBAPixel");
  staticMembers.insert({
    "RGBAPixel",
      StaticAccessor("RGBAPixel",
        &_Magick_Color_templ::Magick_Color_RGBAPixel_get,
        &JS_veto_set_static_variable,
        static_cast<napi_property_attributes>(napi_writable | napi_enumerable | napi_configurable))
    });
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

