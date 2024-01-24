/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: ResourceLimits (_Magick_ResourceLimits) */
// jsnapi_getclass
Napi::Function _Magick_ResourceLimits_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_ResourceLimits_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_ResourceLimits_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_ResourceLimits_inst>::DefineClass(env, "ResourceLimits", symbolTable);
}

void _Magick_ResourceLimits_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_ResourceLimits_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_ResourceLimits_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  
  /* add static class functions and variables */
  // jsnapi_register_static_function
  staticMembers.erase("area");
  staticMembers.insert({
    "area",
      StaticMethod("area",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_area,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("disk");
  staticMembers.insert({
    "disk",
      StaticMethod("disk",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_disk,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("file");
  staticMembers.insert({
    "file",
      StaticMethod("file",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_file,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("height");
  staticMembers.insert({
    "height",
      StaticMethod("height",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_height,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("listLength");
  staticMembers.insert({
    "listLength",
      StaticMethod("listLength",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_listLength,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("map");
  staticMembers.insert({
    "map",
      StaticMethod("map",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_map,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("memory");
  staticMembers.insert({
    "memory",
      StaticMethod("memory",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_memory,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("thread");
  staticMembers.insert({
    "thread",
      StaticMethod("thread",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_thread,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("throttle");
  staticMembers.insert({
    "throttle",
      StaticMethod("throttle",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_throttle,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_static_function
  staticMembers.erase("width");
  staticMembers.insert({
    "width",
      StaticMethod("width",
        &_Magick_ResourceLimits_templ::_wrap_ResourceLimits__wrap_Magick_ResourceLimits_width,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

