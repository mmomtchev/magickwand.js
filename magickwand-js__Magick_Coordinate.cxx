/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG JSE (https://www.swig.org).
 * Version 5.0.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

#include "swig/magickwand-js.h"

/* Class: Coordinate (_Magick_Coordinate) */
// jsnapi_getclass
Napi::Function _Magick_Coordinate_inst::GetClass(Napi::Env env) {
  std::map<std::string, _Magick_Coordinate_templ::PropertyDescriptor> members, staticMembers;
  GetMembers(env, members, staticMembers);
  
  std::vector<_Magick_Coordinate_inst::PropertyDescriptor> symbolTable;
  for (auto it = members.begin(); it != members.end(); it++)
  symbolTable.push_back(it->second);
  for (auto it = staticMembers.begin(); it != staticMembers.end(); it++)
  symbolTable.push_back(it->second);
  
  return Napi::ObjectWrap<_Magick_Coordinate_inst>::DefineClass(env, "Coordinate", symbolTable);
}

void _Magick_Coordinate_inst::GetMembers(
  Napi::Env env,
  std::map<std::string, _Magick_Coordinate_templ::PropertyDescriptor> &members,
  std::map<std::string, _Magick_Coordinate_templ::PropertyDescriptor> &staticMembers
  ) {
  std::map<std::string, SWIG_NAPI_ObjectWrap_templ<SWIG_NAPI_ObjectWrap_inst>::PropertyDescriptor> baseMembers, baseStaticMembers;
  SWIG_NAPI_ObjectWrap_inst::GetMembers(env, baseMembers, baseStaticMembers);
  members.insert(baseMembers.begin(), baseMembers.end());
  staticMembers.insert(staticMembers.begin(), staticMembers.end());
  
  /* register wrapper functions */
  // jsnapi_register_member_function
  members.erase("x");
  members.insert({
    "x",
      _Magick_Coordinate_templ::InstanceMethod("x",
        &_Magick_Coordinate_templ::_wrap_Coordinate__wrap_Magick_Coordinate_x,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  // jsnapi_register_member_function
  members.erase("y");
  members.insert({
    "y",
      _Magick_Coordinate_templ::InstanceMethod("y",
        &_Magick_Coordinate_templ::_wrap_Coordinate__wrap_Magick_Coordinate_y,
        static_cast<napi_property_attributes>(napi_writable | napi_configurable))
    });
  
  /* add static class functions and variables */
  
  
#ifndef NAPI_CPP_EXCEPTIONS
  goto fail;
fail:
  return;
#endif
}

