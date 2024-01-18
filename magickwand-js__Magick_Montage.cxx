/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (https://www.swig.org).
 * Version 5.0.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: Montage (_Magick_Montage) */
// jsnapi_getclass
Napi::Function _Magick_Montage_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_Montage_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_Montage_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_Montage_inst>::DefineClass(env, "Montage", symbolTable);
}

void _Magick_Montage_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_Montage_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_Montage_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("backgroundColorAsync");
  members.insert({
    "backgroundColorAsync",
      _Magick_Montage_templ::InstanceMethod("backgroundColorAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_backgroundColorAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("backgroundColor");
  members.insert({
    "backgroundColor",
      _Magick_Montage_templ::InstanceMethod("backgroundColor",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_backgroundColor,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("fileNameAsync");
  members.insert({
    "fileNameAsync",
      _Magick_Montage_templ::InstanceMethod("fileNameAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_fileNameAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("fileName");
  members.insert({
    "fileName",
      _Magick_Montage_templ::InstanceMethod("fileName",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_fileName,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("fillColorAsync");
  members.insert({
    "fillColorAsync",
      _Magick_Montage_templ::InstanceMethod("fillColorAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_fillColorAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("fillColor");
  members.insert({
    "fillColor",
      _Magick_Montage_templ::InstanceMethod("fillColor",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_fillColor,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("fontAsync");
  members.insert({
    "fontAsync",
      _Magick_Montage_templ::InstanceMethod("fontAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_fontAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("font");
  members.insert({
    "font",
      _Magick_Montage_templ::InstanceMethod("font",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_font,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("geometryAsync");
  members.insert({
    "geometryAsync",
      _Magick_Montage_templ::InstanceMethod("geometryAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_geometryAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("geometry");
  members.insert({
    "geometry",
      _Magick_Montage_templ::InstanceMethod("geometry",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_geometry,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("gravityAsync");
  members.insert({
    "gravityAsync",
      _Magick_Montage_templ::InstanceMethod("gravityAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_gravityAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("gravity");
  members.insert({
    "gravity",
      _Magick_Montage_templ::InstanceMethod("gravity",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_gravity,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("labelAsync");
  members.insert({
    "labelAsync",
      _Magick_Montage_templ::InstanceMethod("labelAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_labelAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("label");
  members.insert({
    "label",
      _Magick_Montage_templ::InstanceMethod("label",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_label,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("pointSizeAsync");
  members.insert({
    "pointSizeAsync",
      _Magick_Montage_templ::InstanceMethod("pointSizeAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_pointSizeAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("pointSize");
  members.insert({
    "pointSize",
      _Magick_Montage_templ::InstanceMethod("pointSize",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_pointSize,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("shadowAsync");
  members.insert({
    "shadowAsync",
      _Magick_Montage_templ::InstanceMethod("shadowAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_shadowAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("shadow");
  members.insert({
    "shadow",
      _Magick_Montage_templ::InstanceMethod("shadow",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_shadow,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("strokeColorAsync");
  members.insert({
    "strokeColorAsync",
      _Magick_Montage_templ::InstanceMethod("strokeColorAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_strokeColorAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("strokeColor");
  members.insert({
    "strokeColor",
      _Magick_Montage_templ::InstanceMethod("strokeColor",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_strokeColor,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("textureAsync");
  members.insert({
    "textureAsync",
      _Magick_Montage_templ::InstanceMethod("textureAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_textureAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("texture");
  members.insert({
    "texture",
      _Magick_Montage_templ::InstanceMethod("texture",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_texture,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("tileAsync");
  members.insert({
    "tileAsync",
      _Magick_Montage_templ::InstanceMethod("tileAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_tileAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("tile");
  members.insert({
    "tile",
      _Magick_Montage_templ::InstanceMethod("tile",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_tile,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("titleAsync");
  members.insert({
    "titleAsync",
      _Magick_Montage_templ::InstanceMethod("titleAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_titleAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("title");
  members.insert({
    "title",
      _Magick_Montage_templ::InstanceMethod("title",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_title,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("transparentColorAsync");
  members.insert({
    "transparentColorAsync",
      _Magick_Montage_templ::InstanceMethod("transparentColorAsync",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_transparentColorAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("transparentColor");
  members.insert({
    "transparentColor",
      _Magick_Montage_templ::InstanceMethod("transparentColor",
        &_Magick_Montage_templ::_wrap_Montage__wrap_Magick_Montage_transparentColor,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("updateMontageInfoAsync");
  members.insert({
    "updateMontageInfoAsync",
      _Magick_Montage_templ::InstanceMethod("updateMontageInfoAsync",
        &_Magick_Montage_templ::_wrap_Magick_Montage_updateMontageInfoAsync,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("updateMontageInfo");
  members.insert({
    "updateMontageInfo",
      _Magick_Montage_templ::InstanceMethod("updateMontageInfo",
        &_Magick_Montage_templ::_wrap_Magick_Montage_updateMontageInfo,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

